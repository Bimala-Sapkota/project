// export interface ICategoryData {
//     _id:string,
//     name:string,
//     description:string,
//     createdAt:string;
//     updatedAt:string
// }

// export interface ICategory {
//     name:string,
//     description?:string,

// }

// Define the ICategoryData interface
export interface ICategoryData {
  _id: string; // Unique identifier for each category
  name: string; // The name of the category
  description: string; // Description of the category
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last updated timestamp
}

// Define a simplified ICategory interface
export interface ICategory {
  name: string; // Name of the category
  description?: string; // Optional description for the category
}

// Define the API response interface
export interface ICategoriesResponse {
  data: ICategoryData[]; // Array of category data
}
