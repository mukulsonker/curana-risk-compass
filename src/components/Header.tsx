
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange, Facility, Provider } from '@/types/dashboard';
import { facilities, providers, states } from '@/services/mockData';

interface HeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (value: DateRange) => void;
  facility: string | null;
  onFacilityChange: (value: string | null) => void;
  state: string | null;
  onStateChange: (value: string | null) => void;
  provider: string | null;
  onProviderChange: (value: string | null) => void;
}

const Header = ({
  dateRange,
  onDateRangeChange,
  facility,
  onFacilityChange,
  state,
  onStateChange,
  provider,
  onProviderChange,
}: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Curana Health: Risk Stratification Dashboard
        </h1>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Select
            value={dateRange}
            onValueChange={(value) => onDateRangeChange(value as DateRange)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="60">Last 60 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={facility || ""}
            onValueChange={(value) => onFacilityChange(value === "" ? null : value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Facilities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Facilities</SelectItem>
              {facilities.map((facility) => (
                <SelectItem key={facility.id} value={facility.name}>
                  {facility.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={state || ""}
            onValueChange={(value) => onStateChange(value === "" ? null : value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={provider || ""}
            onValueChange={(value) => onProviderChange(value === "" ? null : value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Providers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Providers</SelectItem>
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.name}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

export default Header;
