/**
 * Poprawki łamania linii w języku polskim
 */

const nbsp = String.fromCharCode(160)
const number = '[\\dπ]'
const letter = '[\\wĄĆĘŁŃÓŚŹŻąćęłńóśźż]'
const conjunctive = 'lub|ale|czy|nad|pod|bez|nie|tak|albo|więc|lecz|przez|niech|tylko'

export const sierotki = (input: string): string => {
	let output = input

	output = output.replace(new RegExp(` (${letter}) `, 'gi'), ` $1${nbsp}`)
	output = output.replace(new RegExp(` (${letter}{2}) `, 'gi'), ` $1${nbsp}`)
	output = output.replace(new RegExp(` (${number}{1,2}) `, 'gi'), ` $1${nbsp}`)
	output = output.replace(new RegExp(` (${conjunctive}) `, 'gi'), ` $1${nbsp}`)

	output = output.replace(new RegExp(` (${letter})([,.!?]?\r?(?:\n|$))`, 'gi'), `${nbsp}$1$2`)
	output = output.replace(new RegExp(` (${letter}{2})([,.!?]?\r?(?:\n|$))`, 'gi'), `${nbsp}$1$2`)
	output = output.replace(new RegExp(` (${conjunctive})([,.!?]?\r?(?:\n|$))`, 'gi'), `${nbsp}$1$2`)

	output = output.replace(new RegExp(`([^,:]) (${letter}),`, 'gi'), `$1${nbsp}$2,`)
	output = output.replace(new RegExp(`([^,:]) (${letter}{2}),`, 'gi'), `$1${nbsp}$2,`)
	output = output.replace(new RegExp(`([^,:]) (${conjunctive}),`, 'gi'), `$1${nbsp}$2,`)

	return output
}

export const wdowy = (input: string): string =>
	input.replace(new RegExp(` (${letter}+)([.?!]?\r?\n?$)`, 'i'), '&nbsp;$1$2')

export default {
	sierotki,
	wdowy,
}
