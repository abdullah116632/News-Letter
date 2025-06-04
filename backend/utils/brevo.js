import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendEmailToBrevo = async (email, listId) => {
  try {
    // Authenticate
    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.ContactsApi();

    // Contact data
    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.listIds = [listId];
    createContact.updateEnabled = true; // overwrite if exists

    // Send request
    await apiInstance.createContact(createContact);
    console.log(`✅ Email ${email} added to Brevo list.`);
  } catch (err) {
    console.error("❌ Brevo error:", err?.response?.body || err.message);
    throw new Error("Failed to add email to Brevo");
  }
};

export const removeEmailFromBrevo = async (email, listId) => {
  try {
    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.ContactsApi();

    // Delete contact by email
    await apiInstance.deleteContact(email);

    console.log(`✅ Email ${email} removed from Brevo.`);
  } catch (err) {
    console.error("❌ Brevo remove error:", err?.response?.body || err.message);
    throw new Error("Failed to remove email from Brevo");
  }
};

