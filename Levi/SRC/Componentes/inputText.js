import {text, textprops} from './themed';

export function monoText (props. textprops) {
    return <text (...props) style={[props.style. {fontfamily: 'Spacemomo'}]} />;
}


