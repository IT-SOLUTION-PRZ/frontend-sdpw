import { z } from "zod";

export const lureFormSchema = z.object({
  fish_species_id: z.string().min(1, "Wybierz gatunek ryby"),
  water_type_id: z.string().min(1, "Wybierz typ zbiornika"),
  time_of_day_id: z.string().min(1, "Wybierz porę dnia"),
  water_clarity_id: z.string().min(1, "Wybierz przejrzystość wody"),
  season_id: z.string().min(1, "Wybierz porę roku"),
  water_temperature_id: z.string().min(1, "Wybierz temperaturę wody"),
});

export const lureFormDefaultValues = {
  fish_species_id: "",
  water_type_id: "",
  time_of_day_id: "",
  water_clarity_id: "",
  season_id: "",
  water_temperature_id: "",
};