import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RosetteDivider } from "@/components/ui/Ornaments";
import { HeroSlider } from "@/components/home/HeroSlider";
import { MassScheduleSection } from "@/components/home/MassScheduleSection";
import { LatestArticlesSection } from "@/components/home/LatestArticlesSection";
import { AnnouncementSection } from "@/components/home/AnnouncementSection";
import { LiturgicalTodayCard } from "@/components/home/LiturgicalTodayCard";
import {
  getHeroSlides,
  getAllMassSchedules,
  getLatestArticles,
  getLatestAnnouncements,
} from "@/lib/queries";
import { getEffectiveToday } from "@/lib/liturgical-effective";

export const revalidate = 300;

export default async function HomePage() {
  const [slides, schedules, articles, announcements, liturgicalDay] = await Promise.all([
    getHeroSlides(),
    getAllMassSchedules(),
    getLatestArticles(3),
    getLatestAnnouncements(3),
    getEffectiveToday(),
  ]);

  return (
    <div>
      <HeroSlider slides={slides} />

      {/* Jadwal misa jadi pita terang tepat di bawah hero — prioritas utama
          pengunjung, sesuai seksi .misa pada template. */}
      <MassScheduleSection schedules={schedules} />

      <Container className="space-y-24 py-24">
        {liturgicalDay && (
          <Reveal className="mx-auto max-w-md" direction="scale">
            <LiturgicalTodayCard day={liturgicalDay} />
          </Reveal>
        )}

        <AnnouncementSection announcements={announcements} />
      </Container>

      <RosetteDivider />

      <Container className="pb-24">
        <LatestArticlesSection articles={articles} />
      </Container>
    </div>
  );
}
