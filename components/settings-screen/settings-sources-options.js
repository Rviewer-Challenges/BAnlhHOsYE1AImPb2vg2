import { View, Text } from 'react-native';
import SettingsCheckbox from './settings-checkbox';

const SettingsSourcesOptions = ({ styles, sources, onChange }) => {
	return (
		<View>
			<Text style={styles.get('sectionTitle')}>Fuentes</Text>
			<View
				style={{
					width: '90%',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			>
				{sources.map((source) => {
					return (
						<SettingsCheckbox
							key={source.url}
							value={source.url}
							text={source.name}
							activated={source.isActivated}
							onChange={(value, isActivated) => onChange(value, isActivated)}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default SettingsSourcesOptions;
