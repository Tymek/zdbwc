import {
	List,
	Datagrid,
	TextField,
	FunctionField,
	SimpleForm,
	TextInput,
	Create,
	DeleteButton,
	Edit,
} from 'react-admin'
import moment from 'utils/moment'
import { DateTimeField, DateTimeInput } from './fields'

export const NotificationList = props => (
	<List
		{...props}
		// empty={<Empty />}
		title="Lista powiadomień"
		exporter={false}
		bulkActionButtons={false}
		sort={{ field: 'published_at', order: 'DESC' }}
	>
		<Datagrid rowClick="show">
			<DateTimeField source="published_at" format="dddd, D MMMM, HH:mm" withRelative />
			<TextField source="title" emptyText="&mdash;" />
			{/* <TextField source="content" emptyText="&mdash;" /> */}
			<FunctionField
				label="treść"
				render={record => (
					<div style={{
						maxWidth: '24rem',
						wordWrap: 'break-word',
						maxHeight: '2.5rem',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: '2',
					}}>{record['content']}</div>
				)}
			/>
			<DeleteButton undoable={false} />
		</Datagrid>
	</List>
)

export const NotificationCreate = props => (
	<Create {...props} title="Dodaj powiadomienie">
		<SimpleForm redirect="list">
			<TextInput source="title" />
			<TextInput source="content" multiline />
			<DateTimeInput source="published_at" defaultValue={moment().format('YYYY-MM-DDTHH:mm')} />
		</SimpleForm>
	</Create>
)

export const NotificationEdit = props => (
	<Edit {...props}>
		<SimpleForm redirect="list">
			<TextInput source="title" />
			<TextInput source="content" multiline />
			<DateTimeInput source="published_at" defaultValue={moment().format('YYYY-MM-DDTHH:mm')} />
		</SimpleForm>
	</Edit>
)
