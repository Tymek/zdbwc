import {
	List,
	Datagrid,
	TextField,
	Edit,
	SimpleForm,
	TextInput,
	Create,
	Show,
	TabbedShowLayout,
	Tab,
	FunctionField,
	ReferenceManyField,
	EditButton,
	TopToolbar,
	Button,
	required,
	// Link,
} from 'react-admin'
import { Link } from 'react-router-dom'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import { withStyles } from '@material-ui/core/styles'
import moment from 'utils/moment'
import { RelativeTimeField, DateTimeField, TimeField, DateTimeInput } from './fields'

const styles = {
	button: {
		marginTop: '1rem',
		marginBottom: '1rem',
	},
}

const Total = props => <span>{props.total || (<>&mdash;</>)}</span>

export const SessionList = props => (
	<List
		{...props}
		title="Lista sesji"
		exporter={false}
		bulkActionButtons={false}
		sort={{ field: 'begins_at', order: 'ASC' }}
	>
		<Datagrid rowClick="show">
			{/* <TextField source="id" /> */}
			<DateTimeField showTime source="begins_at" />
			<TimeField showTime source="ends_at" emptyText="&mdash;" />
			<TextField source="name" emptyText="&mdash;" />
			<ReferenceManyField sortable={false} reference="topic" target="session_id" label="tematy">
				<Total />
			</ReferenceManyField>
			<TextField source="speaker" emptyText="&mdash;" />
			<RelativeTimeField source="updated_at" />
		</Datagrid>
	</List>
)

export const SessionEdit = props => (
	<Edit {...props} title="Edytuj sesję">
		<SimpleForm>
			<TextInput source="name" />
			<DateTimeInput source="begins_at" validate={[required()]} />
			<DateTimeInput source="ends_at" />
			<TextInput source="speaker" />
		</SimpleForm>
	</Edit>
)

export const SessionCreate = props => (
	<Create {...props} title="Dodaj sesję">
		<SimpleForm>
			<TextInput source="name" />
			<DateTimeInput source="begins_at" validate={[required()]} />
			<DateTimeInput source="ends_at" />
			<TextInput source="speaker" />
		</SimpleForm>
	</Create>
)

const AddNewCommentButton = ({ record }) => (
	<Button
		component={Link}
		to={{
			pathname: '/topic/create',
			state: {
				session_id: record ? record.id : null,
			},
		}}
		label="Dodaj temat"
	>
		<SpeakerNotesIcon />
	</Button>
)

const AddNewCommentBottomButton = withStyles(styles)(({ classes, record }) => (
	<Button
		className={classes.button}
		variant="contained"
		component={Link}
		to={{
			pathname: '/topic/create',
			state: {
				session_id: record ? record.id : null,
			},
		}}
		label="Dodaj temat od sesji"
	>
		<SpeakerNotesIcon />
	</Button>
))

const SessionShowActions = ({ basePath, data }) => (
	<TopToolbar>
		<EditButton basePath={basePath} record={data} />
		&emsp;
		<AddNewCommentButton basePath={basePath} record={data} />
	</TopToolbar>
)

export const SessionShow = props => (
	<Show {...props}  actions={<SessionShowActions />} >
		<TabbedShowLayout>
			<Tab label="sesja">
				<TextField source="name" emptyText="&mdash;" />
				<FunctionField label="data i godzina" render={
					record => `${
						moment(record['begins_at']).format('D MMMM, dddd, [od] HH:mm')
					}${record['ends_at']
						? ` do ${moment(record['ends_at']).format('HH:mm')}`
						: ''}`
				}/>
				<ReferenceManyField reference="topic" target="session_id" label="tematy">
					<Total />
				</ReferenceManyField>
				<TextField source="speaker" emptyText="&mdash;" />
			</Tab>
			<Tab label="tematy" path="topics">
				<ReferenceManyField reference="topic" target="session_id" addLabel={false}>
					<Datagrid>
						<TextField source="subject" emptyText="&mdash;" />
						<TextField source="speaker" emptyText="&mdash;" />
						<TextField source="location" emptyText="&mdash;" />
						<EditButton />
					</Datagrid>
				</ReferenceManyField>
				<AddNewCommentBottomButton />
			</Tab>
		</TabbedShowLayout>
	</Show>
)
