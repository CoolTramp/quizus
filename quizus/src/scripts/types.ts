export type NewUser = {
  id: string;
  name: string;
  mail: string;
  password: string;
};

export type LoginType = {
  mail: string;
  password: string;
};

export type Folder = {
  userId?: string;
  setsId?: string;
  oldFolderName?: string;
  folderName: string;
  description: string;
  imageURL: string;
};

export type Set = {
  userId?: string;
  folderNames: string[];
  name: string;
  setId: string;
  description: string;
  imageURL: string;
};

export type Card = {
  setId?: string;
  cardId: string;
  term: string;
  definition: string;
  imageURL: string;
};

export type Mark = {
  cardId: string;
  mark: boolean;
};

export type BaseFolder = {
  folder_name: string;
  description: string;
  image_url: string;
  sets_id: string | null;
  user_id: string;
};

export type BaseSet = {
  set_name: string;
  description: string;
  image_url: string;
  set_id: string;
  user_id: string;
  directory_location: string[];
};

export type BaseCard = {
  user_id: string;
  card_id: string;
  card_in_set_id: string;
  term: string;
  definition: string;
  image_url: string;
  mark: boolean;
};

export type ExisteName = {
  folder_name: string;
};

export type ExistedSetName = {
  set_name: string;
};

export type BooleanDispatch = React.Dispatch<React.SetStateAction<boolean>>;

export type ServerData = boolean | ExisteName[];

export type TypeProfile = { profile: boolean; name?: string };

export type AnswerAuthorization = TypeProfile | null;

export type ServerCurrentFolderAnswer =
  | TypeProfile
  | BaseFolder
  | null
  | { folderName: boolean };

export type ServerCurrentSetAnswer =
  | TypeProfile
  | BaseSet
  | null
  | { setName: boolean };

export type TypeContextOpenedFolder = {
  name: string;
  setName: (str: string) => void;
  folderDescription: string;
  setFolderDescription: (str: string) => void;
  imageURL: string;
  setImageURL: (str: string) => void;
  refreshPage: boolean;
  setRefreshPage: (value: boolean) => void;
  areThereSet: boolean;
  setAreThereSet: (value: boolean) => void;
};

export type TypeContextSet = {
  name: string;
  setName: (str: string) => void;
  setDescription: string;
  setSetDescription: (str: string) => void;
  imageURL: string;
  setImageURL: (str: string) => void;
  refreshPage: boolean;
  setRefreshPage: (value: boolean) => void;
  setDirectoryLocations: string[];
  isAddCardWindow: boolean | null;
  setIsAddCardWindow: (value: boolean | null) => void;
  clickedButton: string;
  setClickedButton: (value: string) => void;
};

export type SetEditor = {
  name: string;
  setName: (str: string) => void;
  setDescription: string;
  setSetDescription: (str: string) => void;
  imageURL: string;
  setImageURL: (str: string) => void;
};
