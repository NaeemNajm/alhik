
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { InputField } from './components/InputField';
import { Quotation } from './components/Quotation';
import { useUmrahCalculator } from './hooks/useUmrahCalculator';
import { InternalReport } from './components/InternalReport';
import { PrintableWrapper } from './components/PrintableWrapper';
import { ActionableInsights } from './components/ActionableInsights';
import { AdvancedCustomization } from './components/AdvancedCustomization';
import { PerPassengerBreakdown } from './components/PerPassengerBreakdown';
import { CollapsibleSection } from './components/CollapsibleSection';
import { BottomNavBar } from './components/BottomNavBar';
import { 
    ArrowPathIcon, DocumentChartBarIcon, UserIcon, PhoneIcon, CalendarDaysIcon, 
    BanknotesIcon, BuildingOffice2Icon, HomeModernIcon, GlobeAltIcon, TruckIcon, 
    CurrencyBangladeshiIcon, TrashIcon, TagIcon, 
    UsersIcon, UserMinusIcon, UserPlusIcon, FaceSmileIcon,
    ClockIcon, MoonIcon, TicketIcon, PaperAirplaneIcon, GiftIcon, ExclamationTriangleIcon,
    PencilSquareIcon, PlusCircleIcon, ArrowUpTrayIcon, ArrowDownTrayIcon,
    ClipboardDocumentListIcon, WrenchScrewdriverIcon,
    CogIcon, ShoppingCartIcon, LightBulbIcon
} from '@heroicons/react/24/outline';
import { CUSTOM_TRANSPORT_VEHICLES, CUSTOM_TRANSPORT_ROUTES } from './constants';


const TemplateManager: React.FC<{
    templates: { name: string }[];
    currentPackageName: string;
    saveTemplate: (name: string) => void;
    loadTemplate: (name: string) => void;
    deleteTemplate: (name: string) => void;
    onTemplateCreated: (name: string) => void;
    importTemplates: (file: File) => void;
    exportTemplates: () => void;
}> = ({ templates, currentPackageName, saveTemplate, loadTemplate, deleteTemplate, onTemplateCreated, importTemplates, exportTemplates }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync dropdown with the actual loaded package name from the main state
    useEffect(() => {
        const isTemplateLoaded = templates.some(t => t.name === currentPackageName);
        setSelectedTemplate(isTemplateLoaded ? currentPackageName : '');
    }, [currentPackageName, templates]);

    const handleSaveAsNew = () => {
        const name = window.prompt("নতুন টেমপ্লেটের জন্য একটি নাম দিন:");
        if (!name || !name.trim()) return;

        const trimmedName = name.trim();
        if (templates.some(t => t.name.toLowerCase() === trimmedName.toLowerCase())) {
            alert(`"${trimmedName}" নামে একটি টেমপ্লেট আগে থেকেই আছে। অনুগ্রহ করে একটি নতুন নাম ব্যবহার করুন।`);
            return;
        }
        saveTemplate(trimmedName);
        alert(`টেমপ্লেট "${trimmedName}" সফলভাবে সেভ হয়েছে!`);
        onTemplateCreated(trimmedName); // Use callback to trigger load in parent
    };

    const handleUpdate = () => {
        if (selectedTemplate) {
            if (window.confirm(`আপনি কি "${selectedTemplate}" টেমপ্লেটটি বর্তমান তথ্য দিয়ে আপডেট করতে চান?`)) {
                saveTemplate(selectedTemplate);
                alert(`টেমপ্লেট "${selectedTemplate}" সফলভাবে আপডেট করা হয়েছে!`);
            }
        }
    };


    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const templateName = e.target.value;
        setSelectedTemplate(templateName);
        if (templateName) {
            loadTemplate(templateName);
        }
    };

    const handleDelete = () => {
        if (selectedTemplate && window.confirm(`আপনি কি নিশ্চিত যে আপনি "${selectedTemplate}" টেমপ্লেটটি মুছে ফেলতে চান?`)) {
            deleteTemplate(selectedTemplate);
            setSelectedTemplate(''); // Reset selection after delete
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            importTemplates(file);
            e.target.value = ''; // Reset the file input
        }
    };

    return (
        <div className="flex flex-wrap items-center justify-start gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-semibold text-gray-800 mr-2 shrink-0">প্যাকেজ টেমপ্লেট</h3>
            <div className="flex items-center gap-2">
                <select
                    value={selectedTemplate}
                    onChange={handleTemplateChange}
                    className="h-10 border-gray-300 rounded-md shadow-sm focus:ring-[#006837] focus:border-[#006837] min-w-[200px]"
                    disabled={templates.length === 0}
                >
                    <option value="">{templates.length > 0 ? 'টেমপ্লেট বাছাই করুন' : 'কোনো টেমপ্লেট নেই'}</option>
                    {templates.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </select>
                {selectedTemplate && <button onClick={handleDelete} title="এই টেমপ্লেটটি ডিলিট করুন" className="inline-flex items-center justify-center h-10 w-10 p-2 border border-gray-300 rounded-md shadow-sm bg-white text-red-600 hover:bg-red-50 active:scale-95 transition-transform"><TrashIcon className="h-5 w-5" /></button>}
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleUpdate} 
                    disabled={!selectedTemplate}
                    title={!selectedTemplate ? "প্রথমে একটি টেমপ্লেট বাছাই করুন" : "বর্তমান টেমপ্লেট আপডেট করুন"}
                    className="inline-flex items-center h-10 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                    <PencilSquareIcon className="h-5 w-5 mr-2" />
                    আপডেট করুন
                </button>
                 <button 
                    onClick={handleSaveAsNew} 
                    title="বর্তমান সেটিংস দিয়ে নতুন টেমপ্লেট সেভ করুন"
                    className="inline-flex items-center h-10 px-4 border border-dashed border-gray-400 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 active:scale-95 transition-transform"
                 >
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    নতুন হিসেবে সেভ করুন
                 </button>
            </div>
            <div className="flex items-center gap-2 border-l-2 pl-4 ml-2">
                 <button 
                    onClick={handleImportClick} 
                    title="JSON ফাইল থেকে টেমপ্লেট ইম্পোর্ট করুন"
                    className="inline-flex items-center h-10 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 active:scale-95 transition-transform"
                 >
                    <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                    ইম্পোর্ট
                 </button>
                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json,application/json" className="hidden" />
                 <button 
                    onClick={exportTemplates} 
                    title="সব টেমপ্লেট একটি JSON ফাইলে এক্সপোর্ট করুন"
                    className="inline-flex items-center h-10 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 active:scale-95 transition-transform"
                 >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    এক্সপোর্ট
                 </button>
            </div>
        </div>
    );
};

// Define SummaryDashboard as a sub-component to keep the main App component clean
const SummaryDashboard = ({
  calculated,
  formatCurrency,
  isProfit,
}: {
  calculated: ReturnType<typeof useUmrahCalculator>['calculated'];
  formatCurrency: ReturnType<typeof useUmrahCalculator>['formatCurrency'];
  isProfit: boolean;
}) => (
  <div className="space-y-8">
    <div className={`bg-white rounded-xl shadow-xl border border-gray-200/80 p-6 relative overflow-hidden transition-all duration-500`}>
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <div className={`absolute top-5 -right-15 w-24 h-24 rounded-full opacity-10 ${isProfit ? 'bg-green-400' : 'bg-red-400'}`}></div>
      <h3 className="text-lg font-bold text-gray-800 mb-4 font-bengali">লাভ-ক্ষতি বিশ্লেষণ</h3>
      <p className="text-4xl font-bold" style={{ color: isProfit ? '#16a34a' : '#ef4444' }}>{formatCurrency(calculated.totalProfitLossBDT, 'BDT')}</p>
      <p className="font-semibold text-sm" style={{ color: isProfit ? '#16a34a' : '#ef4444' }}>{`${calculated.profitMargin.toFixed(2)}% মার্জিন`}</p>
      <div className="mt-6 space-y-3 border-t pt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500"> চূড়ান্ত আয়</span>
          <span className="font-bold text-green-600">{formatCurrency(calculated.totalRevenueBDT, 'BDT')}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">সর্বমোট খরচ</span>
          <span className="font-bold text-red-600">{formatCurrency(calculated.grandTotalCostBDT, 'BDT')}</span>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
      <div className="flex items-center mb-4">
        <UsersIcon className="h-6 w-6 text-[#006837] mr-3" />
        <h3 className="text-lg font-bold text-gray-800 font-bengali">জনপ্রতি খরচের হিসাব</h3>
      </div>
      <PerPassengerBreakdown calculated={calculated} formatCurrency={formatCurrency} />
    </div>
    {calculated.suggestions && calculated.suggestions.length > 0 && (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
        <div className="flex items-center mb-4">
          <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-3" />
          <h3 className="text-lg font-bold text-gray-800 font-bengali">ডাইনামিক পরামর্শ</h3>
        </div>
        <ActionableInsights suggestions={calculated.suggestions} />
      </div>
    )}
  </div>
);


const App: React.FC = () => {
    const { 
        inputs, 
        setInputs,
        handleInputChange, 
        handleCustomRouteChange,
        handleCustomVehicleQuantityChange,
        calculated, 
        resetAll, 
        formatCurrency, 
        templates, 
        saveTemplate, 
        loadTemplate, 
        deleteTemplate,
        importTemplates,
        exportTemplates
    } = useUmrahCalculator();

    const [view, setView] = useState<'calculator' | 'quotation' | 'internal_report'>('calculator');
    const [newlyCreatedTemplate, setNewlyCreatedTemplate] = useState<string | null>(null);
    const templateManagerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (newlyCreatedTemplate) {
            loadTemplate(newlyCreatedTemplate);
            setNewlyCreatedTemplate(null);
        }
    }, [newlyCreatedTemplate, loadTemplate]);

    const handleTemplateCreated = (name: string) => {
        setNewlyCreatedTemplate(name);
    };
    
    const iconClasses = "h-5 w-5 text-gray-400";
    
    // View Routing
    if (view === 'quotation') {
        return (
            <PrintableWrapper onBack={() => setView('calculator')} fileName={`al-hikmah-quotation-${inputs.customerName.replace(/ /g, '_') || 'customer'}.png`}>
                <Quotation inputs={inputs} calculated={calculated} formatCurrency={formatCurrency} />
            </PrintableWrapper>
        );
    }
    
    if (view === 'internal_report') {
        return (
            <PrintableWrapper onBack={() => setView('calculator')} fileName={`al-hikmah-internal-report-${inputs.packageName.replace(/ /g, '_')}.png`}>
                <InternalReport inputs={inputs} calculated={calculated} formatCurrency={formatCurrency} />
            </PrintableWrapper>
        );
    }

    const isProfit = calculated.totalProfitLossBDT >= 0;
    
    const actionButtons = (
        <div className="hidden lg:grid grid-cols-3 gap-3 print:hidden">
            <button
                onClick={() => setView('quotation')}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006837] hover:bg-[#005c2d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006837] active:scale-95 transition-transform"
            >
                <UserIcon className="h-5 w-5 mr-2"/>
                কোটেশন
            </button>
            <button
                onClick={() => setView('internal_report')}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 active:scale-95 transition-transform"
            >
                <DocumentChartBarIcon className="h-5 w-5 mr-2"/>
                রিপোর্ট
            </button>
            <button
                onClick={resetAll}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 active:scale-95 transition-transform"
            >
                <ArrowPathIcon className="h-5 w-5 mr-2"/>
                রিসেট
            </button>
        </div>
    );
    
    // Calculator View (Default)
    return (
        <div className="min-h-screen bg-gray-100 font-bengali">
            <Header />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    
                    <div ref={templateManagerRef}>
                        <TemplateManager 
                            templates={templates} 
                            currentPackageName={inputs.packageName}
                            saveTemplate={saveTemplate} 
                            loadTemplate={loadTemplate} 
                            deleteTemplate={deleteTemplate} 
                            onTemplateCreated={handleTemplateCreated}
                            importTemplates={importTemplates}
                            exportTemplates={exportTemplates}
                        />
                    </div>

                    {/* Main Dashboard Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Input Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            <CollapsibleSection
                                title="প্যাকেজ ও যাত্রী তথ্য"
                                icon={<ClipboardDocumentListIcon className="h-6 w-6 text-[#006837]" />}
                                defaultOpen={true}
                            >
                                <InputField label="প্যাকেজের নাম/আইডি" id="packageName" value={inputs.packageName} onChange={handleInputChange} className="sm:col-span-2" icon={<TagIcon className={iconClasses}/>}/>
                                <InputField label="প্যাকেজ ক্যাটাগরি" id="packageCategory" value={inputs.packageCategory} onChange={handleInputChange} className="sm:col-span-2" icon={<TagIcon className={iconClasses}/>}/>
                                <InputField label="SAR থেকে BDT বিনিময় হার" id="sarToBdtRate" type="number" value={inputs.sarToBdtRate} onChange={handleInputChange} className="sm:col-span-2" icon={<BanknotesIcon className={iconClasses}/>}/>
                                
                                <InputField label="গ্রাহকের নাম" id="customerName" value={inputs.customerName} onChange={handleInputChange} className="sm:col-span-3" icon={<UserIcon className={iconClasses}/>}/>
                                <InputField label="গ্রাহকের মোবাইল নম্বর" id="customerMobile" value={inputs.customerMobile} onChange={handleInputChange} className="sm:col-span-3" icon={<PhoneIcon className={iconClasses}/>}/>
                                
                                <h4 className="sm:col-span-6 font-medium text-gray-800 -mb-2 mt-4">যাত্রী সংখ্যা</h4>
                                <InputField label="প্রাপ্তবয়স্ক (পুরুষ)" id="adultMales" type="number" value={inputs.adultMales} onChange={handleInputChange} className="sm:col-span-2" icon={<UserPlusIcon className={iconClasses}/>}/>
                                <InputField label="প্রাপ্তবয়স্ক (মহিলা)" id="adultFemales" type="number" value={inputs.adultFemales} onChange={handleInputChange} className="sm:col-span-2" icon={<UserMinusIcon className={iconClasses} style={{transform: 'scaleX(-1)'}}/>}/>
                                <InputField 
                                    label="শিশু (খাবার সহ মূল্য)" 
                                    id="childrenWithFood" 
                                    type="number" 
                                    value={inputs.childrenWithFood} 
                                    onChange={handleInputChange} 
                                    className="sm:col-span-2" 
                                    icon={<FaceSmileIcon className={iconClasses}/>}
                                    disabled={inputs.foodPlan !== 'catering'}
                                />
                                <InputField label="শিশু (খাবার ছাড়া মূল্য)" id="childrenWithoutFood" type="number" value={inputs.childrenWithoutFood} onChange={handleInputChange} className="sm:col-span-2" icon={<FaceSmileIcon className={iconClasses}/>}/>
                                <InputField label="নবজাতক (ইনফ্যান্ট)" id="infants" type="number" value={inputs.infants} onChange={handleInputChange} className="sm:col-span-2" icon={<UsersIcon className={iconClasses}/>}/>
                                
                                <h4 className="sm:col-span-6 font-medium text-gray-800 -mb-2 mt-4">সফরের সময়কাল</h4>
                                <InputField label="সফরের সম্ভাব্য শুরু" id="tourStartDate" type="date" value={inputs.tourStartDate} onChange={handleInputChange} className="sm:col-span-2" icon={<CalendarDaysIcon className={iconClasses}/>}/>
                                <InputField label="মোট অবস্থান (রাত)" id="totalNights" type="number" value={inputs.totalNights} onChange={handleInputChange} className="sm:col-span-2" icon={<MoonIcon className={iconClasses}/>}/>
                                <div className="sm:col-span-2">
                                   <label className="block text-sm font-medium text-gray-700">ফেরার তারিখ (গণনাকৃত)</label>
                                   <div className="mt-1">
                                       <input type="text" readOnly value={calculated.returnDate || 'N/A'} className="w-full bg-gray-100 border-gray-300 rounded-md shadow-sm sm:text-sm"/>
                                   </div>
                                </div>
                            </CollapsibleSection>

                            <CollapsibleSection
                                title="খরচ ও সার্ভিস"
                                icon={<CogIcon className="h-6 w-6 text-[#006837]" />}
                            >
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">ফ্লাইটের ধরণ</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input type="radio" name="flightType" value="direct" checked={inputs.flightType === 'direct'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300"/>
                                            <span className="ml-2 text-gray-700">ডিরেক্ট ফ্লাইট</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="flightType" value="transit" checked={inputs.flightType === 'transit'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300"/>
                                            <span className="ml-2 text-gray-700">ট্রানজিট ফ্লাইট</span>
                                        </label>
                                    </div>
                                 </div>
                                <InputField label="বিমান ভাড়া (জনপ্রতি, প্রাপ্তবয়স্ক)" id="airfareAdultBDT" type="number" unit="BDT" value={inputs.airfareAdultBDT} onChange={handleInputChange} className="sm:col-span-2" icon={<PaperAirplaneIcon className={iconClasses}/>}/>
                                <InputField label="এয়ারলাইন্সের নাম" id="airlineName" value={inputs.airlineName} onChange={handleInputChange} className="sm:col-span-2" icon={<PaperAirplaneIcon className={iconClasses}/>}/>
                                <InputField label="শিশুদের জন্য ছাড়" id="airfareChildDiscount" type="number" unit="%" value={inputs.airfareChildDiscount} onChange={handleInputChange} className="sm:col-span-2" />
                                
                                <h4 className="sm:col-span-6 font-medium text-gray-800 -mb-2 mt-4">আবাসন</h4>
                                <InputField label="মক্কার হোটেল" id="makkahHotelName" value={inputs.makkahHotelName} onChange={handleInputChange} className="sm:col-span-3" icon={<HomeModernIcon className={iconClasses}/>}/>
                                <InputField label="মদিনার হোটেল" id="madinahHotelName" value={inputs.madinahHotelName} onChange={handleInputChange} className="sm:col-span-3" icon={<HomeModernIcon className={iconClasses}/>}/>
                                <InputField label="মক্কার হোটেলের খরচ (SAR/রাত)" id="makkahHotelCostSAR" type="number" unit="SAR" value={inputs.makkahHotelCostSAR} onChange={handleInputChange} icon={<BanknotesIcon className={iconClasses}/>}/>
                                <InputField label="মদিনার হোটেলের খরচ (SAR/রাত)" id="madinahHotelCostSAR" type="number" unit="SAR" value={inputs.madinahHotelCostSAR} onChange={handleInputChange} icon={<BanknotesIcon className={iconClasses}/>}/>
                                <InputField label="জনপ্রতি রুম শেয়ারিং" id="personsPerRoom" type="number" value={inputs.personsPerRoom} onChange={handleInputChange} className="sm:col-span-3" icon={<UsersIcon className={iconClasses}/>}/>
                                <InputField label="মোট রুম সংখ্যা (Override)" id="totalRooms" type="number" value={inputs.totalRooms} onChange={handleInputChange} placeholder={`${calculated.calculatedRooms} (auto)`} className="sm:col-span-3" icon={<BuildingOffice2Icon className={iconClasses}/>}/>

                                <h4 className="sm:col-span-6 font-medium text-gray-800 -mb-2 mt-4">পরিবহন</h4>
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">পরিবহনের ধরণ</label>
                                    <fieldset className="mt-2">
                                        <legend className="sr-only">Transport Type</legend>
                                        <div className="space-y-3 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                                            <div className="flex items-center">
                                                <input id="transport-shared" name="transportType" type="radio" value="shared" checked={inputs.transportType === 'shared'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300" />
                                                <label htmlFor="transport-shared" className="ml-3 block text-sm font-medium text-gray-700">শেয়ারড</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="transport-group" name="transportType" type="radio" value="group" checked={inputs.transportType === 'group'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300" />
                                                <label htmlFor="transport-group" className="ml-3 block text-sm font-medium text-gray-700">গ্রুপ</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="transport-private" name="transportType" type="radio" value="private" checked={inputs.transportType === 'private'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300" />
                                                <label htmlFor="transport-private" className="ml-3 block text-sm font-medium text-gray-700">প্রাইভেট</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="transport-custom" name="transportType" type="radio" value="custom" checked={inputs.transportType === 'custom'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300" />
                                                <label htmlFor="transport-custom" className="ml-3 block text-sm font-medium text-gray-700">কাস্টম</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                
                                 {inputs.transportType === 'group' && (
                                    <div className="sm:col-span-6 p-4 bg-teal-50 border border-teal-200 rounded-md">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-gray-600">স্বয়ংক্রিয় রেট (জনপ্রতি)</span>
                                            <span className="font-bold text-base text-teal-800">{`${formatCurrency(calculated.privateGroupTransportRatePerPersonSAR, 'SAR')} (ভিসা ও পরিবহন অন্তর্ভুক্ত)`}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 sm:col-span-6">যাত্রীসংখ্যার উপর ভিত্তি করে রেট চার্ট থেকে স্বয়ংক্রিয়ভাবে এই খরচ গণনা করা হয়েছে।</p>
                                    </div>
                                 )}
                                 {inputs.transportType === 'private' && (
                                    <>
                                        <InputField 
                                            label="প্রাইভেট গাড়ির বিবরণ" 
                                            id="privateTransportVehicleType" 
                                            value={inputs.privateTransportVehicleType} 
                                            onChange={handleInputChange} 
                                            className="sm:col-span-2"
                                            placeholder="e.g., Sedan, GMC, Bus"
                                            icon={<TruckIcon className={iconClasses}/>}
                                        />
                                        <InputField 
                                            label="প্রাইভেট গাড়ির মোট খরচ" 
                                            id="privateTransportCostSAR" 
                                            type="number" unit="SAR" 
                                            value={inputs.privateTransportCostSAR} 
                                            onChange={handleInputChange} 
                                            className="sm:col-span-2"
                                            icon={<BanknotesIcon className={iconClasses}/>}
                                        />
                                    </>
                                 )}
                                 {inputs.transportType === 'shared' && (
                                    <>
                                        <InputField label="জেদ্দা থেকে মক্কা (SAR)" id="sharedJeddahMakkahSAR" type="number" unit="SAR" value={inputs.sharedJeddahMakkahSAR} onChange={handleInputChange} />
                                        <InputField label="মক্কা জিয়ারাহ (SAR)" id="sharedMakkahZiyarahSAR" type="number" unit="SAR" value={inputs.sharedMakkahZiyarahSAR} onChange={handleInputChange} />
                                        <InputField label="মক্কা থেকে মদিনা (SAR)" id="sharedMakkahMadinahSAR" type="number" unit="SAR" value={inputs.sharedMakkahMadinahSAR} onChange={handleInputChange} />
                                        <InputField label="মদিনা জিয়ারাহ (SAR)" id="sharedMadinahZiyarahSAR" type="number" unit="SAR" value={inputs.sharedMadinahZiyarahSAR} onChange={handleInputChange} />
                                        <InputField label="মদিনা থেকে এয়ারপোর্ট (SAR)" id="sharedMadinahAirportSAR" type="number" unit="SAR" value={inputs.sharedMadinahAirportSAR} onChange={handleInputChange} />
                                    </>
                                 )}

                                 {inputs.transportType === 'custom' && (
                                    <div className="sm:col-span-6 p-4 bg-blue-50 border border-blue-200 rounded-md grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">গাড়ীর ধরণ ও সংখ্যা</label>
                                            <div className="space-y-2">
                                                {Object.entries(CUSTOM_TRANSPORT_VEHICLES).map(([key, vehicle]) => (
                                                    <div key={key} className="flex items-center justify-between gap-2">
                                                        <label htmlFor={`vehicle_qty_${key}`} className="text-sm text-gray-600 flex-grow">
                                                            {vehicle.name} ({vehicle.seats} সিট)
                                                        </label>
                                                        <input 
                                                            type="number" 
                                                            id={`vehicle_qty_${key}`} 
                                                            name={key}
                                                            value={inputs.customTransportVehicles[key] || 0}
                                                            onChange={handleCustomVehicleQuantityChange}
                                                            min="0"
                                                            className="w-20 text-center rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">রুট নির্বাচন করুন</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                                {Object.entries(CUSTOM_TRANSPORT_ROUTES).map(([key, route]) => (
                                                    <label key={key} className="flex items-center text-sm">
                                                        <input type="checkbox" name={key} checked={inputs.customTransportRoutes[key] || false} onChange={handleCustomRouteChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                                        <span className="ml-2 text-gray-700">{route.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                         <div className="md:col-span-3 mt-4 border-t-2 border-blue-200 pt-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="font-medium text-gray-600">কাস্টম পরিবহন খরচ (গণনাকৃত)</span>
                                                <span className="font-bold text-base text-blue-800">{formatCurrency(calculated.totalTransportCostBDT, 'BDT')}</span>
                                            </div>
                                        </div>
                                    </div>
                                 )}

                                <InputField 
                                    label="ভিসা খরচ (জনপ্রতি)" 
                                    id="visaCostPerPersonSAR" 
                                    type="number" 
                                    unit="SAR" 
                                    value={inputs.visaCostPerPersonSAR} 
                                    onChange={handleInputChange} 
                                    className="sm:col-span-2" 
                                    icon={<GlobeAltIcon className={iconClasses}/>}
                                    disabled={inputs.transportType === 'group'}
                                    placeholder={inputs.transportType === 'group' ? 'প্যাকেজে অন্তর্ভুক্ত' : ''}
                                />

                                <h4 className="sm:col-span-6 font-medium text-gray-800 -mb-2 mt-4">অন্যান্য সার্ভিস ও খরচ</h4>
                                
                                <div className="sm:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 items-end border-b border-gray-200 pb-4">
                                    <div className="flex items-center self-center h-full">
                                        <input
                                            type="checkbox"
                                            id="haramainTrainIncluded"
                                            name="haramainTrainIncluded"
                                            checked={inputs.haramainTrainIncluded}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                        />
                                        <label htmlFor="haramainTrainIncluded" className="ml-2 block text-sm font-medium text-gray-700">
                                            হারামাইন হাই-স্পিড ট্রেন অন্তর্ভুক্ত করুন
                                        </label>
                                    </div>
                                    <InputField
                                        label="ট্রেনের প্রকৃত খরচ (SAR)"
                                        id="haramainTrainActualCostSAR"
                                        type="number"
                                        unit="SAR"
                                        value={inputs.haramainTrainActualCostSAR}
                                        onChange={handleInputChange}
                                        disabled={!inputs.haramainTrainIncluded}
                                        className="sm:col-span-1"
                                        icon={<TicketIcon className={iconClasses}/>}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">খাবার পরিকল্পনা</label>
                                    <fieldset className="mt-2">
                                        <legend className="sr-only">Food Plan</legend>
                                        <div className="space-y-3 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                                            <div className="flex items-center">
                                                <input id="food-none" name="foodPlan" type="radio" value="none" checked={inputs.foodPlan === 'none'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300" />
                                                <label htmlFor="food-none" className="ml-3 block text-sm font-medium text-gray-700">খাবার অন্তর্ভুক্ত নয়</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="food-catering" name="foodPlan" type="radio" value="catering" checked={inputs.foodPlan === 'catering'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300" />
                                                <label htmlFor="food-catering" className="ml-3 block text-sm font-medium text-gray-700">ক্যাটারিং খাবার</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="food-breakfast" name="foodPlan" type="radio" value="breakfastOnly" checked={inputs.foodPlan === 'breakfastOnly'} onChange={handleInputChange} className="focus:ring-[#006837] h-4 w-4 text-[#006837] border-gray-300" />
                                                <label htmlFor="food-breakfast" className="ml-3 block text-sm font-medium text-gray-700">শুধু হোটেলের নাস্তা</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                
                                <InputField 
                                    label="ক্যাটারিং খরচ (দৈনিক/জনপ্রতি)" 
                                    id="foodCostPerDaySAR" 
                                    type="number" 
                                    unit="SAR" 
                                    value={inputs.foodCostPerDaySAR} 
                                    onChange={handleInputChange} 
                                    className="sm:col-span-3" 
                                    disabled={inputs.foodPlan !== 'catering'}
                                />
                                 <InputField 
                                    label="হোটেলের নাস্তার খরচ (দৈনিক/জনপ্রতি)" 
                                    id="breakfastCostPerDaySAR" 
                                    type="number" 
                                    unit="SAR" 
                                    value={inputs.breakfastCostPerDaySAR} 
                                    onChange={handleInputChange} 
                                    className="sm:col-span-3" 
                                    disabled={inputs.foodPlan !== 'breakfastOnly'}
                                />

                                <InputField label="গাইড/মোয়াল্লেম ফি (জনপ্রতি, BDT)" id="guideFeePerPersonBDT" type="number" unit="BDT" value={inputs.guideFeePerPersonBDT} onChange={handleInputChange} icon={<CurrencyBangladeshiIcon className={iconClasses}/>} className="sm:col-span-3"/>
                                <InputField label="অন্যান্য সার্ভিস চার্জ (জনপ্রতি, BDT)" id="otherChargesPerPersonBDT" type="number" unit="BDT" value={inputs.otherChargesPerPersonBDT} onChange={handleInputChange} icon={<CurrencyBangladeshiIcon className={iconClasses}/>} className="sm:col-span-3"/>

                                <h4 className="sm:col-span-6 font-medium text-gray-800 -mb-2 mt-4">অতিরিক্ত খরচ (ঐচ্ছিক)</h4>
                                <InputField label="মেহমানদারী/আপ্যায়ন খরচ (মোট)" id="mehmandariCostBDT" type="number" unit="BDT" value={inputs.mehmandariCostBDT} onChange={handleInputChange} icon={<GiftIcon className={iconClasses}/>} className="sm:col-span-3"/>
                                <InputField label="জরিমানা/অন্যান্য বিশেষ খরচ (মোট)" id="jorimanaCostBDT" type="number" unit="BDT" value={inputs.jorimanaCostBDT} onChange={handleInputChange} icon={<ExclamationTriangleIcon className={iconClasses}/>} className="sm:col-span-3"/>
                            </CollapsibleSection>
                            
                             <CollapsibleSection
                                title="মূল্য ও লাভ"
                                icon={<BanknotesIcon className="h-6 w-6 text-[#006837]" />}
                            >
                                <InputField label="প্যাকেজ মূল্য (জনপ্রতি, প্রাপ্তবয়স্ক)" id="packagePricePerAdultBDT" type="number" unit="BDT" value={inputs.packagePricePerAdultBDT} onChange={handleInputChange} className="sm:col-span-2" icon={<CurrencyBangladeshiIcon className={iconClasses}/>}/>
                                <InputField label="প্যাকেজ মূল্য (জনপ্রতি, নবজাতক)" id="infantCostBDT" type="number" unit="BDT" value={inputs.infantCostBDT} onChange={handleInputChange} className="sm:col-span-2" icon={<CurrencyBangladeshiIcon className={iconClasses}/>}/>
                                <InputField label="ডিসকাউন্ট" id="overallDiscountBDT" type="number" unit="BDT" value={inputs.overallDiscountBDT} onChange={handleInputChange} className="sm:col-span-2" icon={<TagIcon className={iconClasses}/>}/>
                                
                                <div className="sm:col-span-3">
                                   <label className="block text-sm font-medium text-gray-700">শিশু (খাবার সহ, গণনাকৃত)</label>
                                   <div className="mt-1">
                                       <input type="text" readOnly value={formatCurrency(calculated.calculatedPriceChildWithFoodBDT)} className="w-full bg-gray-100 border-gray-300 rounded-md shadow-sm sm:text-sm text-gray-700"/>
                                   </div>
                                </div>
                                <div className="sm:col-span-3">
                                   <label className="block text-sm font-medium text-gray-700">শিশু (খাবার ছাড়া, গণনাকৃত)</label>
                                   <div className="mt-1">
                                       <input type="text" readOnly value={formatCurrency(calculated.calculatedPriceChildWithoutFoodBDT)} className="w-full bg-gray-100 border-gray-300 rounded-md shadow-sm sm:text-sm text-gray-700"/>
                                   </div>
                                </div>
                            </CollapsibleSection>

                            <AdvancedCustomization inputs={inputs} calculated={calculated} handleInputChange={handleInputChange} />

                             {/* --- MOBILE SUMMARY --- */}
                            <div className="block lg:hidden space-y-8">
                                <SummaryDashboard calculated={calculated} formatCurrency={formatCurrency} isProfit={isProfit} />
                            </div>
                        </div>

                        {/* --- DESKTOP STICKY SUMMARY --- */}
                        <div className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-[90px] space-y-8">
                                {actionButtons}
                                <SummaryDashboard calculated={calculated} formatCurrency={formatCurrency} isProfit={isProfit} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="text-center py-4 text-xs text-gray-500 font-bengali print:hidden">
                ডেভেলপ করেছেন: <a href="https://www.facebook.com/NaeemNajom/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#006837] hover:underline">নাজমজ্জামান নাঈম</a>
            </footer>
             <BottomNavBar 
                onQuotationClick={() => setView('quotation')}
                onReportClick={() => setView('internal_report')}
                onResetClick={resetAll}
                onTemplatesClick={() => templateManagerRef.current?.scrollIntoView({ behavior: 'smooth' })}
             />
        </div>
    );
};

export default App;