"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const semantic_token_provider_1 = require("./semantic-token-provider");
function completionItemFactory(completionItem, insertText, documention) {
    const model = new vscode.CompletionItem(completionItem);
    model.insertText = new vscode.SnippetString(insertText);
    model.documentation = new vscode.MarkdownString(documention);
    return model;
}
function getCompletionItems() {
    return [
        completionItemFactory('Select search row where equals', '!|Select search row where|${1:columnTitle}|equals|${2:columnValue}|', 'Selects the first row from a PMSearchGrid where the {columnTitle} equals the {columnValue}'),
        completionItemFactory('Open Search Form', '!|Open Search Form|${1|Paccar Interface Options,Repair Order,Warranty Claim Management|}|\r\n' +
            '|Form Mode|EntityType|Enter!|\r\n' +
            '|${2|new,edit,view|}|${3|PaccarInterfaceOptionsSearch,RepairOrderSearch|}|>>${4:formVariableName}|\r\n', 'Open a search form'),
        completionItemFactory('Perform action', '!|Perform action|${1|New_,Edit,View|Search|Save}|', 'Performs the specified action on the current form')
    ];
}
class FitnesseCodeLensProvider {
    provideCodeLenses(document, token) {
        return [];
    }
    resolveCodeLens(codeLens, token) {
        return codeLens;
    }
}
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCodeLensProvider('fitnesse', new FitnesseCodeLensProvider()));
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'fitnesse' }, new semantic_token_provider_1.DocumentSemanticTokensProvider(), semantic_token_provider_1.semanticLegend));
    const provider1 = vscode.languages.registerCompletionItemProvider('fitnesse', {
        provideCompletionItems(document, position, token, context) {
            // a completion item that can be accepted by a commit character,
            // the `commitCharacters`-property is set which means that the completion will
            // be inserted and then the character will be typed.
            // const commitCharacterCompletion = new vscode.CompletionItem('console');
            // commitCharacterCompletion.commitCharacters = ['.'];
            // commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');
            // a completion item that retriggers IntelliSense when being accepted,
            // the `command`-property is set which the editor will execute after 
            // completion has been inserted. Also, the `insertText` is set so that 
            // a space is inserted after `new`
            // const commandCompletion = new vscode.CompletionItem('new');
            // commandCompletion.kind = vscode.CompletionItemKind.Keyword;
            // commandCompletion.insertText = 'new ';
            // commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
            // return all completion items as array
            //return getCompletionItems();//.concat([
            // 	commitCharacterCompletion,
            // 	commandCompletion
            // ]);
            return [];
        }
    });
    // const provider2 = vscode.languages.registerCompletionItemProvider(
    // 	'fitnesse',
    // 	{
    // 		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
    // 			// get all text until the `position` and check if it reads `console.`
    // 			// and if so then complete if `log`, `warn`, and `error`
    // 			const line = document.lineAt(position);
    // 			const linePrefix = document.lineAt(position).text.substr(0, position.character);
    // 			if (linePrefix === '!') {
    // 				return getCompletionItems();
    // 			}
    // 			else if (linePrefix === '!|Perform action|') {
    // 				return [
    // 					new vscode.CompletionItem('New_', vscode.CompletionItemKind.Constant),
    // 					new vscode.CompletionItem('Edit', vscode.CompletionItemKind.Constant),
    // 					new vscode.CompletionItem('View', vscode.CompletionItemKind.Constant),
    // 					new vscode.CompletionItem('Search', vscode.CompletionItemKind.Constant)
    // 				];
    // 			}
    // 			return undefined;
    // 		}
    // 	},
    // 	'|' // triggered whenever a '.' is being typed
    // );
    // const hoverProvider = vscode.languages.registerHoverProvider('fitnesse', {
    // 	provideHover(document, position, token) {
    // 		return new vscode.Hover('I am a hover!');
    // 	}
    // });
    context.subscriptions.push(provider1);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map