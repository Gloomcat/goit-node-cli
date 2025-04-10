import fs from "fs/promises";

import { nanoid } from "nanoid";

const contactsPath = "src/db/contacts.json";

const updateContacts = (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = data.splice(index, 1);
  await updateContacts(data);

  return result;
}

export async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  data.push(newContact);
  await updateContacts(data);

  return newContact;
}
