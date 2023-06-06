import * as React from 'react';
import axios from 'axios';
import { HostContext } from '@context/Host';

interface IForm {
  fromRow?: number | undefined;
  toRow?: number | undefined;
  batchLength?: number | undefined;
  promptContext?: string | undefined;
  promptQuestion?: string | undefined;
  csvFile?: File | undefined;
}

export type FormType = IForm;

interface IFormContext {
  formContext?: IForm | null | undefined;
  setFormContext?:
    | React.Dispatch<React.SetStateAction<IForm>>
    | null
    | undefined;
  performCleanUp?: boolean | undefined;
  setPerformCleanUp?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  formData: FormData | undefined;
  setFormData: React.Dispatch<React.SetStateAction<FormData>> | undefined;
  myFormData: FormData | undefined;
  canDownload: boolean | undefined;
  setCanDownload: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  postFormData: ((formData: FormData | undefined) => Promise<void>) | undefined;
}

export type FormContextType = IFormContext;

export const FormContext = React.createContext<FormContextType>({
  formContext: undefined,
  setFormContext: undefined,
  performCleanUp: undefined,
  setPerformCleanUp: undefined,
  formData: undefined,
  setFormData: undefined,
  myFormData: undefined,
  canDownload: undefined,
  setCanDownload: undefined,
  postFormData: undefined,
});

type ChildrenType = {
  children?: React.ReactElement | React.ReactElement[] | null | undefined;
};

export const FormProvider = ({
  children,
}: ChildrenType): React.ReactElement => {
  const [formContext, setFormContext] = React.useState<IForm>({
    fromRow: -1,
    toRow: -1,
    batchLength: 20,
    promptContext: `Assist me in researching website niches using a list of URLs. For each URL, provide the niche and whether the site is in English or non-English. Use the format "URL - Niche, Language". Select one niche from the list and indicate the language as either English or non-English, e.g., "Advertising, non-English".



    Academia, College & University
    Advertising
    Animals
    Animation
    Apparel & Fashion
    Architecture
    Artificial intelligence
    Arts & Culture
    Astronomy
    Athlete
    Automotive & Cars
    Aviation
    Badminton
    Baseball
    Basketball
    Beauty & Cosmetics
    Biking
    Biotechnology
    Blogging
    Boating
    Books, Reading & Magazine
    Camping
    Cats
    CBD & Cannabis
    Children, Infants & Baby
    Civil Rights & Social Action
    Climbing
    Coaching
    Community Organization
    Computers
    Consumer Internet
    Cooking
    Crafts
    Cricket
    Cruises
    Cycling & Mountain Biking
    Dancing
    Design
    Diet
    DIY
    Dogs
    E-Commerce & Business
    Economics
    Editing
    Education, Teaching & E-learning
    Electronics
    Entertainment
    Entrepreneurship
    Events
    Film
    Finance & Financial Services
    Fishing
    Fitness, Exercise & Bodybuilding
    Food & Beverage
    Football
    Fragrance
    Furniture
    Gadgets
    Gardening
    Golf
    Haircare
    Health Care & Mental Health
    Health, Wellness & Holistic
    Hiking
    Hockey
    Home Improvement
    Hospitality
    Human Resources
    Human Rights
    Illustration
    Interior Design
    Internet
    Internet Marketing
    Investing
    Journalism
    Kid's / Child's Fashion
    Kids
    Learning
    Lifestyle
    Literature
    Local Business
    Luxury goods, Jewellery & Jewelry
    Marketing
    Martial Arts
    Medicine, Nutrition, Supplements & Vitamins
    Meditation
    Men's Fashion
    Men's Health
    Men's Interest
    Music
    Nature
    News
    Non-Profit Organization
    Outdoors & Adventure
    Painting
    Parenting
    Performing Arts
    Personal Development
    Personal Finance
    Pets
    Photography
    Politics
    Psychology
    Public Figure & Celebrity
    Publishing
    Real Estate
    Recruiting
    Religious Organization
    Restaurants
    Retail
    Running
    SaaS
    Science & Technology
    Seniors
    Shoes & Footwear
    Skateboarding
    Skiing
    Skincare & Makeup
    Snowboarding
    Soccer
    Social Commerce
    Social Media
    Social Services
    Software
    Software Development
    Sports
    Startups
    Sustainable living
    Swimming
    Technology
    Tennis
    Theatre
    Travel, Leisure & Tourism
    Utilities, Services & Telecommunications
    Venture Capital
    Video Games & Gaming
    Weddings
    Women's Fashion
    Women's Health
    Women's Interest
    Writing
    Yoga
    `,
    promptQuestion: `What all niches do these ${20} websites belong to from my list and are they in English or non-english:`,
    csvFile: undefined,
  });
  const [performCleanUp, setPerformCleanUp] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>(new FormData());
  const myFormData = new FormData();
  const [canDownload, setCanDownload] = React.useState<boolean>(false);
  const { host } = React.useContext(HostContext);
  const postFormData = async (formData: FormData | undefined) => {
    try {
      const uploadCsvResponse = await axios.post(
        `${host}/upload_csv`,
        formData,
        { withCredentials: true }
      );
      console.log(uploadCsvResponse.data);
      if (uploadCsvResponse.data.status === 'success') {
        setCanDownload!(true);
      }
    } catch (error) {
      console.error('Error occurred while uploading CSV:', error);
    }
  };
  return (
    <FormContext.Provider
      value={{
        formContext,
        setFormContext,
        performCleanUp,
        setPerformCleanUp,
        formData,
        setFormData,
        myFormData,
        canDownload,
        setCanDownload,
        postFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
