import { generateHTML } from "@tiptap/html";
import { extensions } from "../constants/tiptapExtensions";
import parse from "html-react-parser";

const parseJsonToHtml = (json) => {
 return parse(generateHTML(json, extensions));
};

export default parseJsonToHtml;