import { z } from "zod";

// TYMCZASOWE

export const lureFormSchema = z.object({
  "fish-species": z.string().min(1, "Wybierz gatunek ryby"),
  "water-type": z.string().min(1, "Wybierz typ zbiornika"),
  "time-of-day": z.string().min(1, "Wybierz porę dnia"),
  "water-clarity": z.string().min(1, "Wybierz przejrzystość wody"),
  season: z.string().min(1, "Wybierz porę roku"),
  "water-temperature": z.string().min(1, "Wybierz temperaturę wody"),
});

export const lureFormDefaultValues = {
  "fish-species": "",
  "water-type": "",
  "time-of-day": "",
  "water-clarity": "",
  season: "",
  "water-temperature": "",
};
