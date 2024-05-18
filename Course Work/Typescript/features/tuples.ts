const drink = {
  color: "brown",
  carbonate: true,
  sugar: 40,
};

const pepsi: [string, boolean, number] = ["brown", true, 40];

// type alias
type Drink = [string, boolean, number];

const coke: Drink = ["brown", true, 40];
