export type Item = {
  label: string;
  id: string;
  children?: Item[];
};

export const data: Item[] = [
  {
    label: "Fruits",
    id: "fruits",
    children: [
      {
        label: "Apple",
        id: "apple",
        children: [
          {
            label: "Red Apple",
            id: "red-apple",
          },
        ],
      },
      {
        label: "Mango",
        id: "mango",
        children: [
          {
            label: "Green Mango",
            id: "green-mango",
          },
        ],
      },
      {
        label: "Strawberry",
        id: "strawberry",
      },
    ],
  },
  {
    label: "Colors",
    id: "colors",
    children: [
      {
        label: "Grays",
        id: "grays",
        children: [
          {
            label: "Light Gray",
            id: "light-gray",
            children: [
              {
                label: "Light Gray 1",
                id: "light-gray-1",
              },
              {
                label: "Light Gray 2",
                id: "light-gray-2",
              },
            ],
          },
          {
            label: "Dark Gray",
            id: "dark-gray",
          },
        ],
      },
      {
        label: "Red",
        id: "red",
      },
    ],
  },
  {
    label: "Biryani",
    id: "biryani",
  },
];
