const profile = {
  profileName: "alex",
  age: 20,
  coords: {
    lat: 0,
    lang: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

const { age, profileName }: { age: number; profileName: string } = profile;

const {
  coords: { lat, lang },
}: { coords: { lat: number; lang: number } } = profile;
