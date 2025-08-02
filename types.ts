export interface PerPassengerCustomization {
  hasFood: boolean;
  hasZiyarah: boolean;
  hasLocalTransport: boolean;
}

export interface UmrahPackageInputs {
  // Section 1
  packageName: string;
  packageCategory: string; // New field
  customerName: string;
  customerMobile: string;
  adultMales: number;
  adultFemales: number;
  childrenWithFood: number;
  childrenWithoutFood: number;
  infants: number;
  sarToBdtRate: number;
  tourStartDate: string;
  totalNights: number;

  // Section 2
  foodPlan: 'none' | 'catering' | 'breakfastOnly'; // Replaced foodIncluded
  flightType: 'direct' | 'transit'; 
  airlineName: string; // New field
  airfareAdultBDT: number; // Re-added for manual input
  airfareChildDiscount: number;
  makkahHotelName: string;
  madinahHotelName: string;
  makkahHotelCostSAR: number;
  madinahHotelCostSAR: number;
  personsPerRoom: number;
  totalRooms: number | ''; // Allow empty string for placeholder behavior
  
  // New Transport section
  transportType: 'group' | 'private' | 'shared' | 'custom';
  privateTransportVehicleType: string;
  privateTransportCostSAR: number;
  visaCostPerPersonSAR: number;

  // Shared transport costs
  sharedJeddahMakkahSAR: number;
  sharedMakkahZiyarahSAR: number;
  sharedMakkahMadinahSAR: number;
  sharedMadinahZiyarahSAR: number;
  sharedMadinahAirportSAR: number;
  
  // Custom transport options
  customTransportVehicles: Record<string, number>;
  customTransportRoutes: Record<string, boolean>;

  foodCostPerDaySAR: number;
  breakfastCostPerDaySAR: number; // New field for breakfast cost
  guideFeePerPersonBDT: number;
  otherChargesPerPersonBDT: number;
  
  // New additional costs
  mehmandariCostBDT: number;
  jorimanaCostBDT: number;

  // Optional Services
  haramainTrainIncluded: boolean;
  haramainTrainActualCostSAR: number;
  
  // Section 4 - Dynamic Pricing & Discount
  packagePricePerAdultBDT: number;
  infantCostBDT: number;
  overallDiscountBDT: number;

  // Advanced Customizations: Number of people GETTING the service
  adultsWithHaramain: number;
  childrenWithHaramain: number;
  adultsWithZiyarah: number; // For shared transport
  childrenWithZiyarah: number; // For shared transport

  // Expanded Advanced Customizations
  customFoodAdults: number;
  customFoodChildren: number;
  customAccommodationAdults: number;
  customAccommodationChildren: number;
  customGuideAdults: number;
  customGuideChildren: number;
}

export interface Suggestion {
  type: 'warning' | 'tip' | 'info';
  message: string;
}

export interface PassengerBreakdown {
    airfare: number;
    accommodation: number;
    transport: number;
    visa: number;
    food: number;
    haramainTrain: number;
    other: number;
    total: number;
}


export interface CalculatedCosts {
  totalTravelers: number; // Adults + Children
  totalAdults: number;
  totalChildren: number;
  totalSouls: number; // Adults + Children + Infants
  returnDate: string;
  totalNights: number;
  totalTourDays: number;
  calculatedDaysInMakkah: number;
  calculatedDaysInMadinah: number;

  calculatedRooms: number;
  childAirfareBDT: number;
  totalAirfareBDT: number;
  totalInfantCostBDT: number;
  totalAccommodationCostBDT: number;
  totalVisaCostBDT: number;
  totalTransportCostBDT: number;
  totalFoodCostBDT: number;
  totalGuideCostBDT: number;
  totalOtherChargesBDT: number; // Renamed from totalOtherCostsBDT for clarity
  grandTotalCostBDT: number;

  // Haramain Train
  haramainTrainRevenueBDT: number;
  haramainTrainCostBDT: number;
  haramainTrainRevenuePerAdultBDT: number;
  haramainTrainRevenuePerChildBDT: number;

  // Revenue structure
  baseRevenueBDT: number; 
  grossRevenueBDT: number; 
  totalRevenueBDT: number;
  totalProfitLossBDT: number;
  profitMargin: number;
  
  // Transport specific
  privateGroupTransportRatePerPersonSAR: number; // For 'group' type
  calculatedVehicleInfo: string; // For new 'private' type

  suggestions: Suggestion[];
  // Dynamic Child Pricing
  calculatedPriceChildWithFoodBDT: number;
  calculatedPriceChildWithoutFoodBDT: number;

  // Profitability Analysis (simplified)
  basePackageProfitBDT: number;
  haramainTrainProfitBDT: number;

  // Paying passenger counts for detailed breakdown
  payingPassengersForAirfare: number;
  payingPassengersForAccommodation: number;
  payingPassengersForTransport: number;
  payingPassengersForVisa: number;
  payingPassengersForFood: number;
  payingPassengersForHaramain: number;
  payingPassengersForGuide: number;
  payingPassengersForOtherCharges: number;
  
  // Per-person metrics
  perPersonRevenueBDT: number;
  perPersonCostBDT: number;
  perPersonProfitBDT: number;

  // Detailed per-passenger cost breakdown
  perAdultCostBreakdown: PassengerBreakdown;
  perChildCostBreakdown: PassengerBreakdown;
}

export interface Template {
  name: string;
  // Templates save the core cost structure, not customer-specific details.
  inputs: Omit<UmrahPackageInputs, 'packageName' | 'customerName' | 'customerMobile' | 'tourStartDate'>;
}