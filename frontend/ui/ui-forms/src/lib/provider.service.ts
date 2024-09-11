import {DataProvider} from "@solenopsys/ui-utils";
import {FreeProvider} from "@solenopsys/ui-controls";

export interface ProviderService{
  getProvider(  key: string,  titleKey?: string):FreeProvider | DataProvider
}
