export type ScProjectType = 'บ้านเดี่ยว' | 'คอนโด' | 'ทาวน์โฮม';

export type ScProject = {
  id: string;
  name: string;
  type: ScProjectType;
  location: string;
  priceFrom: number; // baht
  priceTo: number; // baht
  landArea: string;
  usableArea: string;
  bedrooms: string;
  bathrooms: string;
  amenities: { icon: string; label: string }[];
  description: string;
  imageUrl: string;
  gallery: string[];
  lat: number;
  lng: number;
  tag: 'ใหม่' | 'พร้อมอยู่' | 'ขายดี';
};

const img = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

const DEFAULT_AMENITIES = [
  { icon: '🏊', label: 'สระว่ายน้ำ' },
  { icon: '🏋️', label: 'ฟิตเนส' },
  { icon: '🌳', label: 'สวน' },
  { icon: '🛡️', label: 'รปภ. 24 ชม.' },
  { icon: '🚗', label: 'ที่จอดรถ' },
  { icon: '🏠', label: 'Smart Home' },
];

export const SC_PROJECTS: ScProject[] = [
  {
    id: 'sc1',
    name: 'Grand Bangkok Boulevard',
    type: 'บ้านเดี่ยว',
    location: 'วิภาวดี–รังสิต',
    priceFrom: 12500000,
    priceTo: 35000000,
    landArea: '50–100 ตร.ว.',
    usableArea: '200–350 ตร.ม.',
    bedrooms: '3–5 ห้อง',
    bathrooms: '4–6 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'โครงการบ้านเดี่ยวระดับ Super Luxury ในตำนานวิภาวดี–รังสิต จากแบรนด์ SC Asset ภายใต้แบรนด์ Grand Bangkok Boulevard เดินทางสะดวกใกล้ทางด่วน ดีไซน์คลาสสิกร่วมสมัยบนทำเลศักยภาพที่ดีที่สุดของโซน พร้อมสิ่งอำนวยความสะดวกครบครันและพื้นที่ส่วนกลางคุณภาพสูง',
    imageUrl: img('photo-1600596542815-ffad4c1539a9'),
    gallery: [
      img('photo-1600596542815-ffad4c1539a9'),
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1600566753190-17f0baa2a6c3'),
      img('photo-1600607687939-ce8a6c25118c'),
    ],
    lat: 13.8654,
    lng: 100.5872,
    tag: 'ใหม่',
  },
  {
    id: 'sc2',
    name: 'The Prestige รัชดา',
    type: 'บ้านเดี่ยว',
    location: 'พระราม 9–รัชดา',
    priceFrom: 10000000,
    priceTo: 18000000,
    landArea: '50–80 ตร.ว.',
    usableArea: '180–260 ตร.ม.',
    bedrooms: '3–4 ห้อง',
    bathrooms: '3–5 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'บ้านเดี่ยวสไตล์โมเดิร์นใจกลางรัชดา ใกล้ MRT และทางด่วน ตอบโจทย์ชีวิตคนเมืองที่ต้องการพื้นที่ส่วนตัวพร้อมความสะดวกครบครัน',
    imageUrl: img('photo-1600585154340-be6161a56a0c'),
    gallery: [img('photo-1600585154340-be6161a56a0c'), img('photo-1600607687939-ce8a6c25118c')],
    lat: 13.7705,
    lng: 100.574,
    tag: 'พร้อมอยู่',
  },
  {
    id: 'sc3',
    name: 'The Grand Lux รามอินทรา',
    type: 'บ้านเดี่ยว',
    location: 'รามอินทรา',
    priceFrom: 22500000,
    priceTo: 40000000,
    landArea: '80–120 ตร.ว.',
    usableArea: '280–420 ตร.ม.',
    bedrooms: '4–5 ห้อง',
    bathrooms: '5–6 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'คฤหาสน์หรูระดับ Luxury บนถนนรามอินทรา พื้นที่กว้างขวาง ส่วนกลางระดับโรงแรม ใกล้ทางด่วนและวงแหวน',
    imageUrl: img('photo-1613490493576-7fde63acd811'),
    gallery: [img('photo-1613490493576-7fde63acd811'), img('photo-1600596542815-ffad4c1539a9')],
    lat: 13.8412,
    lng: 100.6562,
    tag: 'ใหม่',
  },
  {
    id: 'sc4',
    name: 'Pave รังสิต',
    type: 'ทาวน์โฮม',
    location: 'วิภาวดี–รังสิต',
    priceFrom: 6500000,
    priceTo: 9000000,
    landArea: '20–35 ตร.ว.',
    usableArea: '120–180 ตร.ม.',
    bedrooms: '3 ห้อง',
    bathrooms: '3 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'ทาวน์โฮมดีไซน์ใหม่โซนรังสิต ฟังก์ชันครบเหมือนบ้านเดี่ยว ใกล้ม.กรุงเทพและฟิวเจอร์พาร์ค',
    imageUrl: img('photo-1568605114967-8130f3a36994'),
    gallery: [img('photo-1568605114967-8130f3a36994')],
    lat: 13.9612,
    lng: 100.6178,
    tag: 'พร้อมอยู่',
  },
  {
    id: 'sc5',
    name: 'Venue ID เวสต์เกต',
    type: 'บ้านเดี่ยว',
    location: 'นนทบุรี',
    priceFrom: 8900000,
    priceTo: 14000000,
    landArea: '50–70 ตร.ว.',
    usableArea: '160–230 ตร.ม.',
    bedrooms: '3–4 ห้อง',
    bathrooms: '3–4 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'บ้านเดี่ยวซีรีส์ใหม่ใกล้เซ็นทรัลเวสต์เกต เดินทางสะดวกด้วยรถไฟฟ้าสายสีม่วง ครบทุกฟังก์ชันสำหรับครอบครัว',
    imageUrl: img('photo-1600047509807-ba8f99d2cdde'),
    gallery: [img('photo-1600047509807-ba8f99d2cdde')],
    lat: 13.8771,
    lng: 100.4126,
    tag: 'ขายดี',
  },
  {
    id: 'sc6',
    name: 'Centric สุขุมวิท',
    type: 'คอนโด',
    location: 'สุขุมวิท',
    priceFrom: 18000000,
    priceTo: 32000000,
    landArea: '–',
    usableArea: '60–140 ตร.ม.',
    bedrooms: '1–3 ห้อง',
    bathrooms: '1–3 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'คอนโดมิเนียมหรูใจกลางสุขุมวิท ใกล้ BTS วิวเมืองพาโนรามา พร้อมส่วนกลางครบครันบนชั้นดาดฟ้า',
    imageUrl: img('photo-1545324418-cc1a3fa10c00'),
    gallery: [img('photo-1545324418-cc1a3fa10c00')],
    lat: 13.7305,
    lng: 100.5697,
    tag: 'ใหม่',
  },
  {
    id: 'sc7',
    name: 'Verve พระราม 9',
    type: 'คอนโด',
    location: 'พระราม 9–รัชดา',
    priceFrom: 25000000,
    priceTo: 45000000,
    landArea: '–',
    usableArea: '80–200 ตร.ม.',
    bedrooms: '2–4 ห้อง',
    bathrooms: '2–4 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'แฟลกชิปคอนโดมิเนียมย่าน New CBD พระราม 9 เพดานสูง วัสดุพรีเมียม พร้อม Sky Facilities ชั้น 40',
    imageUrl: img('photo-1512917774080-9991f1c4c750'),
    gallery: [img('photo-1512917774080-9991f1c4c750')],
    lat: 13.7589,
    lng: 100.5664,
    tag: 'ใหม่',
  },
  {
    id: 'sc8',
    name: 'Bangkok Boulevard ปิ่นเกล้า',
    type: 'บ้านเดี่ยว',
    location: 'ปิ่นเกล้า–ตลิ่งชัน',
    priceFrom: 15000000,
    priceTo: 25000000,
    landArea: '55–90 ตร.ว.',
    usableArea: '220–320 ตร.ม.',
    bedrooms: '4 ห้อง',
    bathrooms: '4–5 ห้อง',
    amenities: DEFAULT_AMENITIES,
    description:
      'บ้านเดี่ยวสไตล์ Modern Classic โซนปิ่นเกล้า ใกล้ทางด่วนศรีรัช เดินทางเข้าเมืองสะดวก สังคมคุณภาพ',
    imageUrl: img('photo-1605276374104-dee2a0ed3cd6'),
    gallery: [img('photo-1605276374104-dee2a0ed3cd6')],
    lat: 13.7831,
    lng: 100.4485,
    tag: 'พร้อมอยู่',
  },
];

export const getProject = (id: string): ScProject =>
  SC_PROJECTS.find(p => p.id === id) ?? SC_PROJECTS[0];

/** "฿12.5M" — short form used on map pins and list cards */
export const formatPriceShort = (baht: number): string => {
  const m = baht / 1000000;
  return `฿${Number.isInteger(m) ? m : m.toFixed(1)}M`;
};

/** "฿ 12.5 ล้าน" — long Thai form used on the Present screen */
export const formatPriceThai = (baht: number): string => {
  const m = baht / 1000000;
  return `฿ ${Number.isInteger(m) ? m : m.toFixed(1)} ล้าน`;
};

/** "฿ 12,500,000" — full form used on the Detail screen */
export const formatPriceFull = (baht: number): string => `฿ ${baht.toLocaleString('en-US')}`;

// Consult-screen filter options (counts are display-only, from the design)
export const PROJECT_TYPES: { icon: string; label: ScProjectType; count: number }[] = [
  { icon: '🏠', label: 'บ้านเดี่ยว', count: 30 },
  { icon: '🏢', label: 'คอนโด', count: 12 },
  { icon: '🏘️', label: 'ทาวน์โฮม', count: 12 },
];

export const PROJECT_LOCATIONS: { label: string; count: number }[] = [
  { label: 'สุขุมวิท', count: 8 },
  { label: 'วิภาวดี–รังสิต', count: 12 },
  { label: 'พระราม 9–รัชดา', count: 6 },
  { label: 'ลาดพร้าว–เอกมัย', count: 9 },
  { label: 'บางนา–ตราด', count: 5 },
  { label: 'ปิ่นเกล้า–ตลิ่งชัน', count: 4 },
  { label: 'รามอินทรา', count: 9 },
  { label: 'พุทธมณฑล', count: 5 },
  { label: 'นนทบุรี', count: 4 },
];

export const BUDGET_RANGES: { label: string; count: string }[] = [
  { label: 'ทุกราคา', count: '30 โครงการ' },
  { label: '1 - 5 ล้านบาท', count: 'ไม่มีโครงการ' },
  { label: '5 - 10 ล้านบาท', count: 'ไม่มีโครงการ' },
  { label: '10-50 ล้านบาท', count: '12 โครงการ' },
  { label: '50 - 100 ล้านบาท', count: '12 โครงการ' },
  { label: '100 ล้านบาทขึ้นไป', count: 'ไม่มีโครงการ' },
];
