const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(path.join(__dirname, './data.json'));
    const data = JSON.parse(rawData);

    console.log('Seeding started...');

    for (const teamInfo of data.leads_information) {
      for (const lead of teamInfo.leads) {
        await prisma.enquiry.create({
          data: {
            phoneNumber: lead.number,
            enquiry: teamInfo.team_name, // Using team_name as enquiry for demonstration
            status: lead.enquiry_status,
            remarks: lead.remarks,
            formated_date: teamInfo.date,
            // You can add more fields here if needed
          },
        });
      }
      console.log(`Seeded ${teamInfo.total_leads} leads for ${teamInfo.team_name}`);
    }

    console.log('Seeding completed successfully!');
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
