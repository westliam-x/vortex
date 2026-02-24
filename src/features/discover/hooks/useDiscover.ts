"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchDiscoverDevelopers } from "../services/discover.service";
import { defaultDiscoverFilters, type DiscoverDeveloper, type DiscoverFiltersState } from "../types";

export const useDiscover = () => {
  const [developers, setDevelopers] = useState<DiscoverDeveloper[]>([]);
  const [filters, setFilters] = useState<DiscoverFiltersState>(defaultDiscoverFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const result = await fetchDiscoverDevelopers();
      setDevelopers(result);
      setLoading(false);
    };
    void run();
  }, []);

  const filtered = useMemo(() => {
    return developers.filter((developer) => {
      if (filters.role !== "All" && !developer.roles.includes(filters.role)) return false;
      if (filters.stack !== "All") {
        const hasStack = developer.stack.some((tech) => tech.toLowerCase() === filters.stack.toLowerCase());
        if (!hasStack) return false;
      }
      if (filters.timezone !== "All" && developer.timezone !== filters.timezone) return false;
      return true;
    });
  }, [developers, filters.role, filters.stack, filters.timezone]);

  const stackOptions = useMemo(() => {
    const unique = new Set<string>();
    developers.forEach((developer) => developer.stack.forEach((tech) => unique.add(tech)));
    return Array.from(unique).sort();
  }, [developers]);

  const timezoneOptions = useMemo(() => {
    const unique = new Set<string>();
    developers.forEach((developer) => unique.add(developer.timezone));
    return Array.from(unique).sort();
  }, [developers]);

  return {
    developers: filtered,
    filters,
    setFilters,
    loading,
    stackOptions,
    timezoneOptions,
  };
};
