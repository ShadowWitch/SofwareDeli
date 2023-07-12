import { env } from "../../../config/env";
import { HttpException, NotFoundException } from "../../../exceptions";
import { Bcrypt } from "../../../shared/infrastructure/bcrypt";
import { emailSender } from "../../../shared/infrastructure/dependecies";
import { Token } from "../../../shared/infrastructure/jwt";
import { UserServices } from "../../user/application/user-services";
import { User } from "../../user/domain/user.model";
import { SignIn } from "../../user/domain/user.schema";

export class AuthServices {
	private readonly bcrypt = Bcrypt.instance;
	private readonly tokenGenerator = Token.instance;

	constructor(private readonly userService: UserServices) {}

	public async signIn(
		credentials: SignIn
	): Promise<{ user: User; token: string }> {
		const user = await this.userService
			.findByUsername(credentials.identifier)
			.then((user) => user)
			.catch((e) => {
				if (e instanceof NotFoundException) {
					return this.userService.findByEmail(credentials.identifier);
				}
				throw e;
			});

		const isValidPassword = await this.bcrypt.compareAsync(
			credentials.password,
			user.password
		);
		if (!isValidPassword || !user.enabled) {
			throw new HttpException(401, "Invalid credentials");
		}

		const token = this.tokenGenerator.create({
			user: user.id,
			company: (user as any).Employee.company_id as string | undefined,
		});

		emailSender.sendEmail(
			user.email,
			"Alerta de inicio de sesión",
			`Se ha iniciado sesión en su cuenta`,
			`
				<h1>Alerta de inicio de sesión</h1>
				<p>Se ha iniciado sesión en su cuenta</p>
				<p>Si no ha sido usted, haga click en el siguiente enlace para recuperar su cuenta:</p>
				<a href="${env.CLIENT_PUBLIC_URL}/auth/recover">Recuperar cuenta</a>
				<p>Si ha sido usted, ignore este mensaje</p>
			`
		);

		return { user: user, token };
	}

	public async signOut(userLogged: User): Promise<User> {
		const { id } = userLogged;
		const user = await this.userService.findById(id);

		return user;
	}

	public async session(userLogged: User): Promise<User> {
		const { id } = userLogged;
		const user = await this.userService.findById(id);

		return user;
	}

	public async desactivateAccount(id: string): Promise<User> {
		const userDesativated = await this.userService.updateById(id, {
			enabled: false,
		});

		return userDesativated;
	}

	public async activateAccount(id: string): Promise<User> {
		const userDesativated = await this.userService.updateById(id, {
			enabled: true,
		});

		return userDesativated;
	}

	public async changePassword(
		id: string,
		oldPassword: string,
		newPassword: string
	): Promise<User> {
		const userFound = await this.userService.findById(id);
		const isPasswordValid = await this.bcrypt.compareAsync(
			oldPassword,
			userFound.password
		);
		if (!isPasswordValid) {
			throw new HttpException(401, "Invalid credentials");
		}

		const hashedPassword = await this.bcrypt.hashAsync(newPassword);
		const userUpdated = await this.userService.updateById(id, {
			password: hashedPassword,
		});

		return userUpdated;
	}

	public async forgotPassword(email: string): Promise<User> {
		const userFound = await this.userService.findByEmail(email);
		if (userFound instanceof NotFoundException) {
			throw new HttpException(401, "Invalid credentials");
		}

		const resetPasswordToken = this.tokenGenerator.create({
			user: userFound.id,
		});

		emailSender.sendEmail(
			userFound.email,
			"Recuperar cuenta",
			`Se ha solicitado un cambio de contraseña para su cuenta. Si no ha sido usted, ignore este mensaje. Si ha sido usted, haga click en el siguiente enlace: ${process.env.CLIENT_PUBLIC_URL}/reset-password/${userFound.id}`,
			`
				<h1>Cambio de contraseña</h1>
				<p>Se ha solicitado un cambio de contraseña para su cuenta. Si no ha sido usted, ignore este mensaje. Si ha sido usted, haga click en el siguiente enlace:</p>
				<a href="${env.CLIENT_PUBLIC_URL}/auth/reset-password?token=${resetPasswordToken}">Cambiar contraseña</a>

			`
		);

		return userFound;
	}

	public async resetPassword(id: string, newPassword: string): Promise<User> {
		const hashedPassword = await this.bcrypt.hashAsync(newPassword);
		const userUpdated = await this.userService.updateById(id, {
			password: hashedPassword,
		});

		await emailSender.sendEmail(
			userUpdated.email,
			"Cambio de contraseña",
			`Se ha cambiado la contraseña de su cuenta`,
			`
				<h1>Cambio de contraseña</h1>
				<p>Se ha cambiado la contraseña de su cuenta</p>
				<p>Si no ha sido usted, haga click en el siguiente enlace para recuperar su cuenta:</p>
				<a href="${env.CLIENT_PUBLIC_URL}/auth/recover">Recuperar cuenta</a>
			`
		);

		return userUpdated;
	}
}
