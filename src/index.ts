import { FileWriter } from "./writer";
import { FileReader } from "./reader";


export class Treasurer {

  public static fileWriter() {
    return new FileWriter();
  }

  public static fileReader() {
    return new FileReader();
  }

}