// globale loading screen voor alleschermen
import * as React from 'react';

import { Loader } from 'semantic-ui-react'

const Loading = () => (
    <Loader active={true} inline='centered' size='huge' />
)

export default Loading