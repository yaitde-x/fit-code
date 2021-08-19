
import * as vscode from 'vscode';

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

export const semanticLegend = (function () {
	const tokenTypesLegend = [
		'comment', 'string', 'keyword', 'number', 'regexp', 'operator', 'namespace',
		'type', 'struct', 'class', 'interface', 'enum', 'typeParameter', 'function',
		'method', 'macro', 'variable', 'parameter', 'property', 'label'
	];
	tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));

	const tokenModifiersLegend = [
		'declaration', 'documentation', 'readonly', 'static', 'abstract', 'deprecated',
		'modification', 'async'
	];
	tokenModifiersLegend.forEach((tokenModifier, index) => tokenModifiers.set(tokenModifier, index));

	return new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
})();

interface IParsedToken {
	line: number;
	startCharacter: number;
	length: number;
	tokenType: string;
	tokenModifiers: string[];
}

export class DocumentSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
	async provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.SemanticTokens> {
		const allTokens = this._parseText(document.getText());
		const builder = new vscode.SemanticTokensBuilder();
		allTokens.forEach((token) => {
			builder.push(token.line, token.startCharacter, token.length, this._encodeTokenType(token.tokenType), this._encodeTokenModifiers(token.tokenModifiers));
		});
		return builder.build();
	}

	private _encodeTokenType(tokenType: string): number {
		if (tokenTypes.has(tokenType)) {
			return tokenTypes.get(tokenType)!;
		} else if (tokenType === 'notInLegend') {
			return tokenTypes.size + 2;
		}
		return 0;
	}

	private _encodeTokenModifiers(strTokenModifiers: string[]): number {
		let result = 0;
		for (let i = 0; i < strTokenModifiers.length; i++) {
			const tokenModifier = strTokenModifiers[i];
			if (tokenModifiers.has(tokenModifier)) {
				result = result | (1 << tokenModifiers.get(tokenModifier)!);
			} else if (tokenModifier === 'notInLegend') {
				result = result | (1 << tokenModifiers.size + 2);
			}
		}
		return result;
	}

	private _parseText(text: string): IParsedToken[] {
		const r: IParsedToken[] = [];
		const lines = text.split(/\r\n|\r|\n/);
		let inFixture = false;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			if (line.trim().length === 0){
				inFixture = false;
			}
			else if (line.startsWith('!include')) {
				const startIndex = line.indexOf(' ') +  1;
				r.push({
					line: i,
					startCharacter: startIndex,
					length: line.length - startIndex,
					tokenType: 'comment',
					tokenModifiers: []
				});
			}
			else if (line.startsWith('.#')) {
				const startIndex = line.indexOf(' ') +  1;
				r.push({
					line: i,
					startCharacter: startIndex,
					length: line.length - startIndex,
					tokenType: 'comment',
					tokenModifiers: []
				});
			}
			else if (line.startsWith('!|') || (line.startsWith('|') && inFixture)) {
				inFixture = true;
				const parts = line.trim().split('|').filter(i => i);
				
				if (parts.length === 0)
					continue;

				if (parts[0] === '!')
					parts.splice(0,1);

				if (parts[0] === 'Check' || parts[0] === 'check')
				{
					r.push({
						line: i,
						startCharacter: line.indexOf(parts[0]),
						length: parts[0].length,
						tokenType: 'method',
						tokenModifiers: []
					});

					parts.splice(0,1);
				}

				let start = 0;

				for (let partIndex = 0; partIndex < parts.length; partIndex++){
					let tokenType = 'parameter';

					if (partIndex % 2 !== 0) {
						tokenType = 'keyword';
					}

					const tokenIndex = line.indexOf(parts[partIndex], start);
					r.push({
						line: i,
						startCharacter: tokenIndex,
						length: parts[partIndex].length,
						tokenType: tokenType,
						tokenModifiers: []
					});
					start = tokenIndex + parts[partIndex].length;
				}
			}
		}
		return r;
	}

	private _parseTextToken(text: string): { tokenType: string; tokenModifiers: string[]; } {
		const parts = text.split('.');
		return {
			tokenType: parts[0],
			tokenModifiers: parts.slice(1)
		};
	}
}