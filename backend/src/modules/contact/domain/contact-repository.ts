import { Contact } from "./contact.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface ContactRepository extends IBaseRepository<Contact> {
	findByPhone(phone: string): Promise<Contact | null>;
}
