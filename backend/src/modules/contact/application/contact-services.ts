import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { ContactRepository } from "../domain/contact-repository";
import { Contact } from "../domain/contact.model";

export class ContactServices {
	constructor(private readonly contactRepository: ContactRepository) {}

	public async findServeral(options: Options): Promise<Contact[]> {
		const where: object = {};

		const itemsFound = await this.contactRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Contact> {
		const itemFound = await this.contactRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Contact) {
		const itemAlreadyExists = await this.contactRepository.findByPhone(
			data.phone
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.contactRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Contact>): Promise<Contact> {
		const itemUpdated = await this.contactRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Contact> {
		const itemDeleted = await this.contactRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.contactRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
