const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(path.join(__dirname, './numbers-json.json'));
    const jsonData = JSON.parse(rawData);

    console.log('Seeding started...');

    const entries = Object.entries(jsonData.data);
    let count = 0;

    for (const [id, enquiryData] of entries) {
      await prisma.enquiry.create({
        data: {
          id: id,
          phoneNumber: enquiryData.phoneNumber,
          enquiry: enquiryData.enquiry,
          status: enquiryData.status,
          remarks: enquiryData.remarks,
          formated_date: enquiryData.formated_date,
          image: enquiryData.image,
          images: enquiryData.images,
          created_at: new Date(enquiryData.created_at.__time__),
        },
      });
      count++;
      if (count % 100 === 0) {
        console.log(`Seeded ${count} enquiries`);
      }
    }

    console.log(`Seeding completed successfully! Total enquiries seeded: ${count}`);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });