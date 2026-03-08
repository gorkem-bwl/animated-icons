"use client";

import { useState } from "react";
import Gallery from "./Gallery";
import Showcase from "./Showcase";

interface IconMeta {
  name: string;
  componentName: string;
  category: string;
  animation: string;
  elementCount: number;
}

export default function PageClient({ iconsMeta }: { iconsMeta: IconMeta[] }) {
  const [primaryColor, setPrimaryColor] = useState("#0d9488");
  const [secondaryColor, setSecondaryColor] = useState("#0f766e");

  return (
    <>
      <div id="gallery">
        <Gallery
          iconsMeta={iconsMeta}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onColorChange={(p, s) => {
            setPrimaryColor(p);
            setSecondaryColor(s);
          }}
        />
      </div>
      <Showcase primaryColor={primaryColor} secondaryColor={secondaryColor} />
    </>
  );
}
