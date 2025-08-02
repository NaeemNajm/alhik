import { UmrahPackageInputs } from './types';

export const DEFAULT_EXCHANGE_RATE = 32.85;
export const CHILD_PRICE_DISCOUNT_BDT = 12000; // Child price is 12k less than adult
export const CUSTOMER_FACING_FOOD_COST_BDT = 10000; // The value of food for the customer

// New Haramain Train Constants
export const HARAMAIN_TRAIN_ACTUAL_COST_SAR = 172;
export const HARAMAIN_TRAIN_CUSTOMER_PRICE_SAR = 200;
export const HARAMAIN_TRAIN_CUSTOMER_PRICE_BDT = 7000;

// New Breakfast Constant
export const DEFAULT_BREAKFAST_COST_SAR = 30;


export const LOCAL_STORAGE_KEYS = {
  INPUTS: 'umrahCostingInputs',
  TEMPLATES: 'umrahCostingTemplates',
};

// Based on the user-provided flyer
export const GROUP_TRANSPORT_RATE_CHART = [
    // Note: Rate includes visa. Ziyarah inclusion is noted.
    { maxPax: 4, rateSAR: 735, includesZiyarah: false, description: 'Sedan Car (1-4 Pax)' },
    { maxPax: 9, rateSAR: 655, includesZiyarah: false, description: 'Van/H1 (5-9 Pax)' },
    { maxPax: 16, rateSAR: 625, includesZiyarah: false, description: 'Coaster (10-16 Pax)' },
    { maxPax: 20, rateSAR: 620, includesZiyarah: false, description: 'Full Bus (17-20 Pax)' },
    { maxPax: 25, rateSAR: 600, includesZiyarah: true, description: 'Full Bus with Ziyarah (21-25 Pax)' },
    { maxPax: 30, rateSAR: 580, includesZiyarah: true, description: 'Full Bus with Ziyarah (26-30 Pax)' },
    { maxPax: 35, rateSAR: 570, includesZiyarah: true, description: 'Full Bus with Ziyarah (31-35 Pax)' },
    { maxPax: 40, rateSAR: 560, includesZiyarah: true, description: 'Full Bus with Ziyarah (36-40 Pax)' },
];

// New "Private" transport vehicle rates from Al Rayhan
export const PRIVATE_VEHICLE_RATES = [
    { type: 'Bus', capacity: 40, cost: 2400, costMadinahJed: 2700, includesZiyarah: true },
    { type: 'Coaster', capacity: 16, cost: 1900, includesZiyarah: false },
    { type: 'Hiace', capacity: 9, cost: 1300, includesZiyarah: false },
    { type: 'Staria', capacity: 7, cost: 1150, includesZiyarah: false },
    { type: 'Car', capacity: 4, cost: 1000, includesZiyarah: false },
];

export const DEFAULT_VISA_FEE_SAR = 560;

// --- START: New Custom Transport Data ---
export const CUSTOM_TRANSPORT_VEHICLES: Record<string, { name: string; seats: number }> = {
  FORD_TAURUS: { name: 'Ford Taurus (বা সমমানের)', seats: 4 },
  GMC: { name: 'GMC (বা সমমানের)', seats: 7 },
  HYUNDAI_H01: { name: 'Hyundai H-01 (বা সমমানের)', seats: 7 },
  MINI_BUS: { name: 'Mini Bus / Hiace', seats: 9 },
  COASTER: { name: 'Coaster', seats: 20 },
  BUS: { name: 'Bus', seats: 47 },
};

export const CUSTOM_TRANSPORT_ROUTES: Record<string, { label: string }> = {
  JEDDAH_MAKKAH: { label: 'জেদ্দা থেকে মক্কা' },
  MAKKAH_MADINAH: { label: 'মক্কা থেকে মদিনা' },
  JEDDAH_AIRPORT_MADINAH: { label: 'জেদ্দা এয়ারপোর্ট থেকে মদিনা' },
  MAKKAH_JEDDAH: { label: 'মক্কা থেকে জেদ্দা' },
  MAKKAH_ZIYARAH: { label: 'মক্কা জিয়ারাহ' },
  MADINAH_ZIYARAH: { label: 'মদিনা জিয়ারাহ' },
  MADINAH_APT_HOTEL: { label: 'মদিনা এয়ারপোর্ট থেকে হোটেল' },
  JEDDAH_AIRPORT_CITY: { label: 'জেদ্দা এয়ারপোর্ট থেকে সিটি' },
  MAKKAH_TAIF_ZIYARAH: { label: 'মক্কা - তায়েফ জিয়ারাহ' },
  MAKKAH_HOTEL_TRAIN: { label: 'মক্কা হোটেল থেকে ট্রেন স্টেশন' },
  MADINAH_HOTEL_TRAIN: { label: 'মদিনা হোটেল থেকে ট্রেন স্টেশন' },
};

export const CUSTOM_TRANSPORT_RATES: Record<string, Record<string, number>> = {
  FORD_TAURUS: { JEDDAH_MAKKAH: 300, MAKKAH_MADINAH: 460, JEDDAH_AIRPORT_MADINAH: 500, MAKKAH_JEDDAH: 260, MAKKAH_ZIYARAH: 200, MADINAH_ZIYARAH: 200, MADINAH_APT_HOTEL: 200, JEDDAH_AIRPORT_CITY: 150, MAKKAH_TAIF_ZIYARAH: 600, MAKKAH_HOTEL_TRAIN: 180, MADINAH_HOTEL_TRAIN: 180 },
  GMC: { JEDDAH_MAKKAH: 450, MAKKAH_MADINAH: 860, JEDDAH_AIRPORT_MADINAH: 900, MAKKAH_JEDDAH: 400, MAKKAH_ZIYARAH: 400, MADINAH_ZIYARAH: 400, MADINAH_APT_HOTEL: 300, JEDDAH_AIRPORT_CITY: 330, MAKKAH_TAIF_ZIYARAH: 1100, MAKKAH_HOTEL_TRAIN: 210, MADINAH_HOTEL_TRAIN: 210 },
  HYUNDAI_H01: { JEDDAH_MAKKAH: 350, MAKKAH_MADINAH: 600, JEDDAH_AIRPORT_MADINAH: 630, MAKKAH_JEDDAH: 300, MAKKAH_ZIYARAH: 300, MADINAH_ZIYARAH: 300, MADINAH_APT_HOTEL: 250, JEDDAH_AIRPORT_CITY: 250, MAKKAH_TAIF_ZIYARAH: 900, MAKKAH_HOTEL_TRAIN: 210, MADINAH_HOTEL_TRAIN: 210 },
  MINI_BUS: { JEDDAH_MAKKAH: 430, MAKKAH_MADINAH: 650, JEDDAH_AIRPORT_MADINAH: 700, MAKKAH_JEDDAH: 380, MAKKAH_ZIYARAH: 350, MADINAH_ZIYARAH: 350, MADINAH_APT_HOTEL: 280, JEDDAH_AIRPORT_CITY: 275, MAKKAH_TAIF_ZIYARAH: 1000, MAKKAH_HOTEL_TRAIN: 320, MADINAH_HOTEL_TRAIN: 320 },
  COASTER: { JEDDAH_MAKKAH: 600, MAKKAH_MADINAH: 850, JEDDAH_AIRPORT_MADINAH: 900, MAKKAH_JEDDAH: 600, MAKKAH_ZIYARAH: 400, MADINAH_ZIYARAH: 400, MADINAH_APT_HOTEL: 350, JEDDAH_AIRPORT_CITY: 300, MAKKAH_TAIF_ZIYARAH: 1100, MAKKAH_HOTEL_TRAIN: 340, MADINAH_HOTEL_TRAIN: 340 },
  BUS: { JEDDAH_MAKKAH: 900, MAKKAH_MADINAH: 1200, JEDDAH_AIRPORT_MADINAH: 1300, MAKKAH_JEDDAH: 850, MAKKAH_ZIYARAH: 500, MADINAH_ZIYARAH: 500, MADINAH_APT_HOTEL: 500, JEDDAH_AIRPORT_CITY: 500, MAKKAH_TAIF_ZIYARAH: 1200, MAKKAH_HOTEL_TRAIN: 500, MADINAH_HOTEL_TRAIN: 500 },
};
// --- END: New Custom Transport Data ---


const initialCustomRoutes = Object.keys(CUSTOM_TRANSPORT_ROUTES).reduce((acc, key) => {
    acc[key] = false;
    return acc;
}, {} as Record<string, boolean>);

const initialCustomVehicles = Object.keys(CUSTOM_TRANSPORT_VEHICLES).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
}, {} as Record<string, number>);


export const INITIAL_INPUTS: UmrahPackageInputs = {
  packageName: 'Standard Umrah Package',
  packageCategory: 'স্ট্যান্ডার্ড',
  customerName: '',
  customerMobile: '',
  tourStartDate: '',
  
  adultMales: 2,
  adultFemales: 2,
  childrenWithFood: 0,
  childrenWithoutFood: 0,
  infants: 0,
  
  totalNights: 13,

  sarToBdtRate: DEFAULT_EXCHANGE_RATE,
  
  foodPlan: 'catering', // Default to catering
  
  flightType: 'direct',
  airlineName: 'সৌদি / বিমান বাংলাদেশ',
  airfareAdultBDT: 95000,
  airfareChildDiscount: 25,
  makkahHotelName: 'ইমার আল খলিল / দার আল-খলিল আর রুশাদ/ লুলু আল দার (বা সমমানের)',
  madinahHotelName: 'রাওয়াফেদ আল মদিনা / দিয়ার আল নূর / তাজ ওয়ার্ল্ড (বা সমমানের)',
  makkahHotelCostSAR: 180,
  madinahHotelCostSAR: 180,

  personsPerRoom: 4,
  totalRooms: '', // Default to empty, so placeholder shows
  
  transportType: 'shared', // Default changed to shared transport
  privateTransportVehicleType: 'Sedan Car',
  privateTransportCostSAR: 1000,
  visaCostPerPersonSAR: DEFAULT_VISA_FEE_SAR,

  sharedJeddahMakkahSAR: 30,
  sharedMakkahZiyarahSAR: 15,
  sharedMakkahMadinahSAR: 50,
  sharedMadinahZiyarahSAR: 15,
  sharedMadinahAirportSAR: 20,
  
  customTransportVehicles: initialCustomVehicles,
  customTransportRoutes: initialCustomRoutes,

  foodCostPerDaySAR: 20,
  breakfastCostPerDaySAR: DEFAULT_BREAKFAST_COST_SAR,
  guideFeePerPersonBDT: 3000,
  otherChargesPerPersonBDT: 2000,
  
  mehmandariCostBDT: 0,
  jorimanaCostBDT: 0,

  haramainTrainIncluded: false,
  haramainTrainActualCostSAR: HARAMAIN_TRAIN_ACTUAL_COST_SAR,

  packagePricePerAdultBDT: 150000,
  infantCostBDT: 50000,
  overallDiscountBDT: 0,

  // Advanced Customization
  adultsWithHaramain: 0,
  childrenWithHaramain: 0,
  adultsWithZiyarah: 0,
  childrenWithZiyarah: 0,

  // Expanded Advanced Customizations
  customFoodAdults: 0,
  customFoodChildren: 0,
  customAccommodationAdults: 0,
  customAccommodationChildren: 0,
  customGuideAdults: 0,
  customGuideChildren: 0,
};