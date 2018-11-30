import React from 'react';
import Member from './member';

const silvaName = 'Silva';

export default props => (
    <div>
        <Member name='João' lastName={silvaName} />
        <Member name='Maria' lastName={silvaName} />
        <Member name='José' lastName={silvaName} />
        <Member name='Pedro' lastName={silvaName} />
    </div>
);