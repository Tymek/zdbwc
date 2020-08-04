import moment from 'utils/moment'
import { KeyboardDateTimePicker }  from '@material-ui/pickers'
import { useInput, useTranslate, FieldTitle } from 'ra-core'
import { InputHelperText } from 'ra-ui-materialui'
import { Typography, Tooltip } from '@material-ui/core'
import PinIcon from 'assets/icons/pin.svg'

export const RelativeTimeField = ({ record, source, emptyText = '' }) => (
	<span>{
		record[source]
			? moment(record[source]).fromNow()
			: emptyText
	}</span>
)

export const DateTimeField = ({ record, source, emptyText = '', format, withRelative }) => {
	const time = record[source] && moment(record[source]).format(format || 'dddd, HH:mm')

	return (
		<span>{
			record[source]
				? time
				: emptyText
		}{
			record[source] && withRelative
				?	<> (<RelativeTimeField record={record} source={source} />)</>
				: null
		}</span>
	)
}

export const TimeField = ({ record, source, emptyText = '' }) => (
	<span>{
		record[source]
			? moment(record[source]).format('HH:mm')
			: emptyText
	}</span>
)

export const DateTimeInput = ({ ...props }) => {
	const {
		label,
		resource,
		source,
		helperText,
	} = props

	const translate = useTranslate()
	const {
		id,
		input,
		isRequired,
		meta: {error, touched},
	} = useInput(props)
	const onChange = value => {
		if (Date.parse(value)) {
			const parsed = moment(value).format('YYYY-MM-DDTHH:mm:ss')
			input.onChange(parsed)
		}
	}

	return (
		<KeyboardDateTimePicker
			id={id}
			style={{ width: '256px' }}
			inputVariant="filled"
			clearable={true}
			margin="dense"
			format="YYYY-MM-DD HH:mm"
			ampm={false}
			openTo={input.value ? 'hours' : 'date'}
			onChange={onChange}
			value={input.value ?? null}
			label={<FieldTitle
				label={label}
				source={source}
				resource={resource}
				isRequired={isRequired}
			/>}
			error={!!(touched && error)}
			helperText={
				<InputHelperText
					touched={touched}
					error={error}
					helperText={helperText}
				/>
			}
			clearLabel={translate('ra.action.clear_input_value')}
			cancelLabel={translate('ra.action.cancel')}
			// required={isRequired}
		/>
	)
}

export const IsPinnedField = ({ record, source }) => {
	const translate = useTranslate()

	return (
		<Typography
			component="span"
			variant="body2"
		>
			{
				record && record[source] ? (
					<Tooltip title={translate('ra.boolean.true')}>
						<PinIcon width="1.25rem" height="1.25rem" style={{ display: 'inline-block', marginBottom: '-3px' }} />
					</Tooltip>
				) : null
			}
		</Typography>
	)
}
