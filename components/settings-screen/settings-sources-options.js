import { View, Text } from 'react-native';
import SettingsCheckbox from './settings-checkbox';

const SettingsSourcesOptions = ({ styles, sources, onChange }) => {
	return (
		<View>
			<Text style={styles.sectionTitle}>Fuentes</Text>
			<View
				style={{
					width: '90%',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			>
				{sources.map((source) => {
					console.log('SOURCE 2', { source });
					return (
						<SettingsCheckbox
							key={source.url}
							value={source.url}
							text={source.name}
							activated={source.isActivated}
							onChange={(value, isActivated) => {
								onChange(value, isActivated);
								/*
							console.log({ value, isActivated });
							sources.map((source) => () => {
								console.log({ source });
								if (source.value == value) {
									source.isActivated = isActivated;
								}
								return source;
							});
							onChange(sources);
							*/
							}}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default SettingsSourcesOptions;
