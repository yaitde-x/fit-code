
import * as vscode from 'vscode';
import { DocumentSemanticTokensProvider, semanticLegend } from './semantic-token-provider';

function completionItemFactory(completionItem: string, insertText: string, documention: string): vscode.CompletionItem {
	const model = new vscode.CompletionItem(completionItem);
	model.insertText = new vscode.SnippetString(insertText);
	model.documentation = new vscode.MarkdownString(documention);
	return model;
}

function getCompletionItems(): vscode.CompletionItem[] {
	return [
		completionItemFactory('Select search row where equals',
			'!|Select search row where|${1:columnTitle}|equals|${2:columnValue}|',
			'Selects the first row from a PMSearchGrid where the {columnTitle} equals the {columnValue}'),
		completionItemFactory('Open Search Form',
			'!|Open Search Form|${1|Paccar Interface Options,Repair Order,Warranty Claim Management|}|\r\n' +
			'|Form Mode|EntityType|Enter!|\r\n' +
			'|${2|new,edit,view|}|${3|PaccarInterfaceOptionsSearch,RepairOrderSearch|}|>>${4:formVariableName}|\r\n',
			'Open a search form'),
		completionItemFactory('Perform action',
			'!|Perform action|${1|New_,Edit,View|Search|Save}|',
			'Performs the specified action on the current form')
	];
}

class FitnesseCodeLensProvider implements vscode.CodeLensProvider {
	public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken):
		vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {

		return [];
	}

	public resolveCodeLens?(codeLens: vscode.CodeLens, token: vscode.CancellationToken):
		vscode.CodeLens | Thenable<vscode.CodeLens> {
		return codeLens;
	}
}

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.languages.registerCodeLensProvider(
			'fitnesse', new FitnesseCodeLensProvider()));

	context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(
		{ language: 'fitnesse' }, new DocumentSemanticTokensProvider(), semanticLegend));

	const provider1 = vscode.languages.registerCompletionItemProvider('fitnesse', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

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


