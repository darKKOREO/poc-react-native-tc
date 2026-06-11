export type Project = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  priceFrom: number;
  imageUrl?: string;
  province?: string;
};

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'The Riverside Residence', lat: 13.7295, lng: 100.5089, priceFrom: 4500000, province: 'Bangkok' },
  { id: 'p2', name: 'Sukhumvit Sky Tower', lat: 13.7373, lng: 100.5604, priceFrom: 6200000, province: 'Bangkok' },
  { id: 'p3', name: 'Ladprao Garden Place', lat: 13.8154, lng: 100.5994, priceFrom: 2800000, province: 'Bangkok' },
  { id: 'p4', name: 'Thonburi Park View', lat: 13.7244, lng: 100.4659, priceFrom: 3100000, province: 'Bangkok' },
  { id: 'p5', name: 'Ratchada Avenue Condo', lat: 13.7785, lng: 100.5697, priceFrom: 3900000, province: 'Bangkok' },
  { id: 'p6', name: 'Bang Na Grand Residence', lat: 13.6685, lng: 100.6083, priceFrom: 2500000, province: 'Bangkok' },
  { id: 'p7', name: 'Chatuchak Living Place', lat: 13.8024, lng: 100.5530, priceFrom: 3300000, province: 'Bangkok' },
  { id: 'p8', name: 'Silom Premier Suites', lat: 13.7246, lng: 100.5328, priceFrom: 7800000, province: 'Bangkok' },
  { id: 'p9', name: 'Ari Hideaway Condo', lat: 13.7798, lng: 100.5447, priceFrom: 4200000, province: 'Bangkok' },
  { id: 'p10', name: 'On Nut Riverside', lat: 13.7048, lng: 100.6014, priceFrom: 2950000, province: 'Bangkok' },
  { id: 'p11', name: 'Phra Khanong Heights', lat: 13.7158, lng: 100.5853, priceFrom: 3450000, province: 'Bangkok' },
  { id: 'p12', name: 'Bang Sue Junction Home', lat: 13.8090, lng: 100.5290, priceFrom: 2750000, province: 'Bangkok' },
  { id: 'p13', name: 'Rama 9 Business Loft', lat: 13.7563, lng: 100.5710, priceFrom: 5400000, province: 'Bangkok' },
  { id: 'p14', name: 'Pinklao Riverfront', lat: 13.7790, lng: 100.4750, priceFrom: 3650000, province: 'Bangkok' },
  { id: 'p15', name: 'Bangkapi Town Square', lat: 13.7656, lng: 100.6450, priceFrom: 2400000, province: 'Bangkok' },
  { id: 'p16', name: 'Thong Lor Signature', lat: 13.7300, lng: 100.5800, priceFrom: 8900000, province: 'Bangkok' },
  { id: 'p17', name: 'Saphan Mai Residences', lat: 13.8780, lng: 100.6150, priceFrom: 2150000, province: 'Bangkok' },
  { id: 'p18', name: 'Wongwian Yai Condo', lat: 13.7220, lng: 100.4860, priceFrom: 2900000, province: 'Bangkok' },
  { id: 'p19', name: 'Bearing Skytrain Place', lat: 13.6605, lng: 100.6390, priceFrom: 2300000, province: 'Bangkok' },
  { id: 'p20', name: 'Sathorn Premier Tower', lat: 13.7195, lng: 100.5290, priceFrom: 9500000, province: 'Bangkok' },
  { id: 'p21', name: 'Min Buri Garden Village', lat: 13.8120, lng: 100.7090, priceFrom: 1950000, province: 'Bangkok' },
  { id: 'p22', name: 'Talingchan Riverside', lat: 13.7780, lng: 100.4570, priceFrom: 2650000, province: 'Bangkok' },
  { id: 'p23', name: 'Lat Phrao Central Place', lat: 13.7980, lng: 100.5780, priceFrom: 3550000, province: 'Bangkok' },
  { id: 'p24', name: 'Asoke Metro Residence', lat: 13.7368, lng: 100.5602, priceFrom: 7100000, province: 'Bangkok' },
  { id: 'p25', name: 'Bang Khae Town Home', lat: 13.6960, lng: 100.4090, priceFrom: 1850000, province: 'Bangkok' },
];
