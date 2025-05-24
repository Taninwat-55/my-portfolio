import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export default function useScrollReveal(reveals = []) {
  useEffect(() => {
    reveals.forEach(({ selector, config }) => {
      ScrollReveal().reveal(selector, config);
    });
  }, [reveals]);
}