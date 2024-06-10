import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSettingsContext } from '@/context/SettingsContext';

const IndexPage = () => {
  const { initialPage } = useSettingsContext();
  const router = useRouter();

  useEffect(() => {
    if (initialPage) {
      console.log("initialPage", initialPage);
      if (initialPage === "Am. Football") {
        router.replace(`/american-football`);
      } else {
        router.replace(`/${initialPage.toLowerCase()}`);
      }
    }
  }, []);

  return null;
};

export default IndexPage;
