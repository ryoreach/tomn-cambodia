import type { Service, Category, Authority, Office, User, ReviewItem, AuditLog } from '@/types'

export const authorities: Authority[] = [
  { id: 'auth-moi', name: { km: 'ក្រសួងមហាផ្ទៃ', en: 'Ministry of Interior (demonstration)' } },
  { id: 'auth-mpwt', name: { km: 'ក្រសួងសាធារណការ និងដឹកជញ្ជូន', en: 'Ministry of Public Works and Transport (demonstration)' } },
  { id: 'auth-mlvt', name: { km: 'ក្រសួងការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ', en: 'Ministry of Labour and Vocational Training (demonstration)' } },
  { id: 'auth-moc', name: { km: 'ក្រសួងពាណិជ្ជកម្ម', en: 'Ministry of Commerce (demonstration)' } },
]

export const categories: Category[] = [
  { id: 'cat-civil', name: { km: 'អត្រានុកូលដ្ឋាន', en: 'Civil Registration' }, icon: 'FileText', description: { km: 'សេវាពាក់ព័ន្ធសំបុត្រកំណើត អាពាហ៍ពិពាហ៍ និងស្លាប់', en: 'Birth, marriage, and death related services' } },
  { id: 'cat-transport', name: { km: 'ដឹកជញ្ជូន', en: 'Transport' }, icon: 'Car', description: { km: 'អាជ្ញាប័ណ្ណបើកបរ និងយានយន្ត', en: 'Driver licenses and vehicles' } },
  { id: 'cat-business', name: { km: 'អាជីវកម្ម', en: 'Business' }, icon: 'Briefcase', description: { km: 'ការចុះបញ្ជី និងអាជ្ញាប័ណ្ណអាជីវកម្ម', en: 'Business registration and licensing' } },
  { id: 'cat-labor', name: { km: 'ការងារ', en: 'Labor' }, icon: 'Users', description: { km: 'សៀវភៅការងារ និងសេវាកម្មការងារ', en: 'Work books and labor services' } },
  { id: 'cat-health', name: { km: 'សុខាភិបាល', en: 'Health' }, icon: 'HeartPulse', description: { km: 'ព័ត៌មានសេវាសុខាភិបាលសាធារណៈ', en: 'Public health service information' } },
  { id: 'cat-education', name: { km: 'អប់រំ', en: 'Education' }, icon: 'GraduationCap', description: { km: 'សេវា និងឯកសារអប់រំ', en: 'Education services and documents' } },
]

export const offices: Office[] = [
  { id: 'off-1', name: { km: 'ការិយាល័យសាធារណៈដោះស្រាយ (គំរូ) ភ្នំពេញ', en: 'Public Service Office (Demo) Phnom Penh' }, authorityId: 'auth-moi', province: { km: 'ភ្នំពេញ', en: 'Phnom Penh' }, district: { km: 'ដូនពេញ', en: 'Daun Penh' }, address: { km: 'អាសយដ្ឋានគំរូ មហាវិថី A សង្កាត់ X', en: 'Demo address, Street A, Sangkat X' }, phone: '012 345 678 (demo)', hours: { km: 'ចន្ទ–សុក្រ 07:30–17:00', en: 'Mon–Fri 07:30–17:00' }, mapUrl: 'https://www.openstreetmap.org', lat: 11.5564, lng: 104.9282 },
  { id: 'off-2', name: { km: 'មជ្ឈមណ្ឌលដឹកជញ្ជូន (គំរូ)', en: 'Transport Center (Demo)' }, authorityId: 'auth-mpwt', province: { km: 'ភ្នំពេញ', en: 'Phnom Penh' }, district: { km: 'ចំការមន', en: 'Chamkar Mon' }, address: { km: 'អាសយដ្ឋានគំរូ មហាវិថី B', en: 'Demo address, Street B' }, phone: '023 000 000 (demo)', hours: { km: 'ចន្ទ–សុក្រ 08:00–16:30', en: 'Mon–Fri 08:00–16:30' }, mapUrl: 'https://www.openstreetmap.org', lat: 11.5449, lng: 104.8922 },
  { id: 'off-3', name: { km: 'មជ្ឈមណ្ឌលសេវាអាជីវកម្ម (គំរូ) សៀមរាប', en: 'Business Service Center (Demo) Siem Reap' }, authorityId: 'auth-moc', province: { km: 'សៀមរាប', en: 'Siem Reap' }, district: { km: 'សៀមរាប', en: 'Siem Reap' }, address: { km: 'អាសយដ្ឋានគំរូ ផ្លូវ C', en: 'Demo address, Road C' }, phone: '063 000 000 (demo)', hours: { km: 'ចន្ទ–សុក្រ 08:00–16:00', en: 'Mon–Fri 08:00–16:00' }, mapUrl: 'https://www.openstreetmap.org', lat: 13.3633, lng: 103.8564 },
]

export const services: Service[] = [
  {
    id: 'svc-birth-cert', title: { km: 'សំបុត្រកំណើត (ព័ត៌មានគំរូ)', en: 'Birth Certificate (Demo Information)' },
    summary: { km: 'ព័ត៌មានអំពីនីតិវិធីទូទៅ និងឯកសារដែលត្រូវរៀបចំសម្រាប់សំបុត្រកំណើត។', en: 'General procedure information and documents to prepare for a birth certificate.' },
    description: { km: 'សេវានេះផ្តល់ការណែនាំទូទៅអំពីការចុះបញ្ជីកំណើត និងការទទួលសំបុត្រកំណើត។ ព័ត៌មានលម្អិតអាចប្រែប្រួលតាមមូលដ្ឋាន។', en: 'This service provides general guidance on birth registration and obtaining a birth certificate. Details may vary by locality.' },
    categoryId: 'cat-civil', authorityId: 'auth-moi',
    eligibility: { km: 'ឪពុកម្តាយ ឬអាណាព្យាបាលនៃកុមារ អាចដាក់ពាក្យបាន (គំរូ)។', en: 'Parents or guardians of the child may apply (demonstration).' },
    procedures: [
      { order: 1, title: { km: 'រៀបចំឯកសារ', en: 'Prepare documents' }, description: { km: 'ប្រមូលឯកសារអត្តសញ្ញាណ និងព័ត៌មានកំណើត។', en: 'Collect identity documents and birth information.' } },
      { order: 2, title: { km: 'ទៅការិយាល័យពាក់ព័ន្ធ', en: 'Visit relevant office' }, description: { km: 'ដាក់ពាក្យនៅសង្កាត់/ឃុំ ឬការិយាល័យដែលមានសមត្ថកិច្ច។', en: 'Submit application at the competent local office.' } },
      { order: 3, title: { km: 'ពិនិត្យ និងទទួល', en: 'Review and receive' }, description: { km: 'រង់ចាំការផ្ទៀងផ្ទាត់ និងទទួលសំបុត្រ។', en: 'Wait for verification and receive the certificate.' } },
    ],
    documents: [
      { id: 'd1', name: { km: 'អត្តសញ្ញាណប័ណ្ណឪពុកម្តាយ (ច្បាប់ចម្លង)', en: 'Parents ID card (copy)' } },
      { id: 'd2', name: { km: 'សៀវភៅគ្រួសារ (បើមាន)', en: 'Family book (if available)' } },
      { id: 'd3', name: { km: 'លិខិតបញ្ជាក់កំណើតពីមណ្ឌលសុខភាព (បើមាន)', en: 'Birth notification from health center (if available)' } },
    ],
    fees: undefined,
    processingTime: undefined,
    officeIds: ['off-1'],
    sources: [{ label: { km: 'ប្រភពសាធារណៈសម្រាប់បង្ហាញ (គំរូ)', en: 'Public demonstration source (sample)' }, url: 'https://example.org/demo-source' }],
    lastVerified: '2026-11-01',
    status: 'published', verification: 'partially_verified', popular: true,
  },
  {
    id: 'svc-driver-license', title: { km: 'អាជ្ញាប័ណ្ណបើកបរ (ព័ត៌មានគំរូ)', en: 'Driver License (Demo Information)' },
    summary: { km: 'ជំហានទូទៅសម្រាប់ការដាក់ពាក្យ ឬបន្តអាជ្ញាប័ណ្ណបើកបរ។', en: 'General steps to apply for or renew a driver license.' },
    description: { km: 'ការណែនាំទូទៅអំពីលក្ខខណ្ឌ និងនីតិវិធីអាជ្ញាប័ណ្ណបើកបរ។ សូមពិនិត្យតម្រូវការជាក់លាក់ជាមួយអាជ្ញាធរពាក់ព័ន្ធ។', en: 'General guidance on driver license requirements and procedures. Check specific requirements with the relevant authority.' },
    categoryId: 'cat-transport', authorityId: 'auth-mpwt',
    eligibility: { km: 'អ្នកដាក់ពាក្យត្រូវមានអាយុ និងលក្ខខណ្ឌសុខភាពតាមកំណត់ (គំរូ)។', en: 'Applicant must meet age and health requirements (demonstration).' },
    procedures: [
      { order: 1, title: { km: 'រៀបចំឯកសារ និងពិនិត្យសុខភាព', en: 'Prepare documents and health check' }, description: { km: 'រៀបចំឯកសារចាំបាច់ និងលទ្ធផលពិនិត្យសុខភាពតាមតម្រូវការ។', en: 'Prepare required documents and any required health check results.' } },
      { order: 2, title: { km: 'ប្រឡង/វាយតម្លៃ', en: 'Test/assessment' }, description: { km: 'ចូលរួមការវាយតម្លៃចំណេះដឹង ឬជំនាញបើកបរតាមប្រភេទ។', en: 'Complete knowledge or driving assessment as applicable.' } },
      { order: 3, title: { km: 'ទទួលអាជ្ញាប័ណ្ណ', en: 'Receive license' }, description: { km: 'ទទួលអាជ្ញាប័ណ្ណនៅមជ្ឈមណ្ឌលសេវា។', en: 'Collect license at the service center.' } },
    ],
    documents: [
      { id: 'd1', name: { km: 'អត្តសញ្ញាណប័ណ្ណ ឬលិខិតឆ្លងដែន', en: 'National ID or passport' } },
      { id: 'd2', name: { km: 'រូបថត', en: 'Photos' } },
      { id: 'd3', name: { km: 'លិខិតបញ្ជាក់សុខភាព (បើតម្រូវ)', en: 'Medical certificate (if required)' } },
    ],
    officeIds: ['off-2'],
    sources: [{ label: { km: 'ប្រភពគំរូសម្រាប់បង្ហាញ', en: 'Sample demonstration source' } }],
    lastVerified: '2026-10-15', status: 'published', verification: 'unverified', popular: true,
  },
  {
    id: 'svc-business-reg', title: { km: 'ចុះបញ្ជីអាជីវកម្ម (ព័ត៌មានគំរូ)', en: 'Business Registration (Demo Information)' },
    summary: { km: 'ព័ត៌មានទូទៅអំពីការចុះបញ្ជីអាជីវកម្ម និងឯកសារពាក់ព័ន្ធ។', en: 'General information about business registration and related documents.' },
    description: { km: 'ការណែនាំទូទៅសម្រាប់អ្នកចង់ចាប់ផ្តើមអាជីវកម្ម។ តម្រូវការពិតប្រាកដអាស្រ័យលើប្រភេទអាជីវកម្ម។', en: 'General guidance for starting a business. Actual requirements depend on business type.' },
    categoryId: 'cat-business', authorityId: 'auth-moc',
    eligibility: { km: 'បុគ្គល ឬនីតិបុគ្គលដែលមានលក្ខខណ្ឌស្របច្បាប់ (គំរូ)។', en: 'Individuals or legal entities meeting legal conditions (demonstration).' },
    procedures: [
      { order: 1, title: { km: 'ពិនិត្យឈ្មោះ និងប្រភេទអាជីវកម្ម', en: 'Check name and business type' }, description: { km: 'ត្រៀមឈ្មោះ និងព័ត៌មានមូលដ្ឋាន។', en: 'Prepare name and basic information.' } },
      { order: 2, title: { km: 'ដាក់ពាក្យចុះបញ្ជី', en: 'Submit registration' }, description: { km: 'បំពេញទម្រង់ និងភ្ជាប់ឯកសារ។', en: 'Complete forms and attach documents.' } },
      { order: 3, title: { km: 'ទទួលវិញ្ញាបនបត្រ', en: 'Receive certificate' }, description: { km: 'ទទួលលទ្ធផលចុះបញ្ជី។', en: 'Receive registration result.' } },
    ],
    documents: [
      { id: 'd1', name: { km: 'អត្តសញ្ញាណប័ណ្ណម្ចាស់អាជីវកម្ម', en: 'Owner identification' } },
      { id: 'd2', name: { km: 'ព័ត៌មានទីតាំងអាជីវកម្ម', en: 'Business location information' } },
    ],
    officeIds: ['off-3'],
    sources: [{ label: { km: 'ប្រភពគំរូ', en: 'Sample source' } }],
    lastVerified: '2026-09-20', status: 'published', verification: 'verified', popular: true,
  },
  {
    id: 'svc-workbook', title: { km: 'សៀវភៅការងារ (ព័ត៌មានគំរូ)', en: 'Work Book (Demo Information)' },
    summary: { km: 'ព័ត៌មានទូទៅអំពីការបង្កើត ឬបន្តសៀវភៅការងារ។', en: 'General information on creating or renewing a work book.' },
    description: { km: 'ការណែនាំទូទៅសម្រាប់កម្មករនិយោជិតទាក់ទងសៀវភៅការងារ។', en: 'General guidance for employees regarding work books.' },
    categoryId: 'cat-labor', authorityId: 'auth-mlvt',
    eligibility: { km: 'កម្មករនិយោជិតដែលមានទំនាក់ទំនងការងារ (គំរូ)។', en: 'Employees with an employment relationship (demonstration).' },
    procedures: [
      { order: 1, title: { km: 'រៀបចំឯកសារ', en: 'Prepare documents' }, description: { km: 'ប្រមូលអត្តសញ្ញាណប័ណ្ណ និងព័ត៌មានការងារ។', en: 'Collect ID and employment information.' } },
      { order: 2, title: { km: 'ដាក់ពាក្យ', en: 'Submit application' }, description: { km: 'ដាក់ពាក្យតាមបែបបទកំណត់។', en: 'Submit according to required procedure.' } },
    ],
    documents: [
      { id: 'd1', name: { km: 'អត្តសញ្ញាណប័ណ្ណ', en: 'National ID card' } },
      { id: 'd2', name: { km: 'រូបថត', en: 'Photos' } },
    ],
    officeIds: ['off-1'],
    sources: [{ label: { km: 'ប្រភពគំរូ', en: 'Sample source' } }],
    status: 'draft', verification: 'unverified',
  },
  {
    id: 'svc-marriage', title: { km: 'ចុះបញ្ជីអាពាហ៍ពិពាហ៍ (ព័ត៌មានគំរូ)', en: 'Marriage Registration (Demo Information)' },
    summary: { km: 'ព័ត៌មានទូទៅអំពីការចុះបញ្ជីអាពាហ៍ពិពាហ៍។', en: 'General information about marriage registration.' },
    description: { km: 'ការណែនាំទូទៅសម្រាប់គូស្វាមីភរិយាដែលចង់ចុះបញ្ជីអាពាហ៍ពិពាហ៍។', en: 'General guidance for couples registering a marriage.' },
    categoryId: 'cat-civil', authorityId: 'auth-moi',
    eligibility: { km: 'គូស្វាមីភរិយាត្រូវបំពេញលក្ខខណ្ឌតាមច្បាប់ (គំរូ)។', en: 'Couples must meet legal conditions (demonstration).' },
    procedures: [
      { order: 1, title: { km: 'រៀបចំឯកសារ', en: 'Prepare documents' }, description: { km: 'រៀបចំឯកសារអត្តសញ្ញាណ និងលិខិតដែលពាក់ព័ន្ធ។', en: 'Prepare identity and related documents.' } },
      { order: 2, title: { km: 'ដាក់ពាក្យ', en: 'Apply' }, description: { km: 'ដាក់ពាក្យនៅការិយាល័យមូលដ្ឋាន។', en: 'Apply at local office.' } },
    ],
    documents: [
      { id: 'd1', name: { km: 'អត្តសញ្ញាណប័ណ្ណភាគីទាំងពីរ', en: 'IDs of both parties' } },
      { id: 'd2', name: { km: 'សំបុត្រកំណើត', en: 'Birth certificates' } },
    ],
    officeIds: ['off-1'],
    sources: [{ label: { km: 'ប្រភពគំរូ', en: 'Sample source' } }],
    status: 'in_review', verification: 'unverified',
  },
]

export const users: User[] = [
  { id: 'u1', name: 'Sophea Chan', email: 'sophea@example.com', role: 'citizen', status: 'active' },
  { id: 'u2', name: 'Dara Kim', email: 'dara@example.com', role: 'editor', status: 'active' },
  { id: 'u3', name: 'Vanna Ly', email: 'vanna@example.com', role: 'reviewer', status: 'active' },
  { id: 'u4', name: 'Admin Demo', email: 'admin@tomn.local', role: 'admin', status: 'active' },
]

export const reviews: ReviewItem[] = [
  { id: 'r1', serviceId: 'svc-marriage', submittedBy: 'Dara Kim', submittedAt: '2026-11-10T09:00:00Z', status: 'pending' },
  { id: 'r2', serviceId: 'svc-workbook', submittedBy: 'Dara Kim', submittedAt: '2026-11-08T08:30:00Z', status: 'pending' },
]

export const auditLogs: AuditLog[] = [
  { id: 'a1', user: 'Admin Demo', action: 'Approved service', target: 'svc-business-reg', timestamp: '2026-11-10T10:15:00Z' },
  { id: 'a2', user: 'Dara Kim', action: 'Submitted for review', target: 'svc-marriage', timestamp: '2026-11-10T09:00:00Z' },
  { id: 'a3', user: 'Vanna Ly', action: 'Updated sources', target: 'svc-birth-cert', timestamp: '2026-11-09T14:20:00Z' },
]

export const stats = { total: services.length, published: services.filter(s=>s.status==='published').length, draft: services.filter(s=>s.status==='draft').length, pending: reviews.filter(r=>r.status==='pending').length }
