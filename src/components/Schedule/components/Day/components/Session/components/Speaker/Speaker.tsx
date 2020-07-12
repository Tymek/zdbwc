const Speaker: React.FC = ({ children }) => (
	<div className="container">
		<div className="label">
			mówca
		</div>
		<div className="content">
			{children}
		</div>
		<style jsx>{`
			--padding-vertical: calc(var(--spacing) * 1.5);
			--padding-horizontal: calc(var(--padding-vertical));

			.container {
				display: grid;
				grid-template-columns: 2fr 3fr;
			}

			.container > div {
				padding-top: var(--padding-vertical);
				padding-bottom: var(--padding-vertical);
			}

			.label {
				color: var(--gray);
				justify-self: end;
				padding-left: var(--spacing);
				padding-right: calc(var(--padding-horizontal) / 2);
			}

			.content {
				text-align: left;
				padding-right: var(--spacing);
				padding-left: calc(var(--padding-horizontal) / 2);
			}
		`}
		</style>
	</div>
)

export default Speaker