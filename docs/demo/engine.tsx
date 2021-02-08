import React, { useEffect, useRef, useState } from 'react';
import Engine, { EngineInterface } from '@aomao/engine';
import Bold from '@aomao/plugin-bold';
import Italic from '@aomao/plugin-italic';
import Underline from '@aomao/plugin-underline';
import Hr, { HrEntry } from '@aomao/plugin-hr';
import Redo from '@aomao/plugin-redo';
import Undo from '@aomao/plugin-undo';
import Tasklist, { Checkbox } from '@aomao/plugin-tasklist';
import Orderedlist from '@aomao/plugin-orderedlist';
import Unorderedlist from '@aomao/plugin-unorderedlist';
import Indent from '@aomao/plugin-indent';
import Heading from '@aomao/plugin-heading';
import Strikethrough from '@aomao/plugin-strikethrough';
import Sub from '@aomao/plugin-sub';
import Sup from '@aomao/plugin-sup';
import Alignment from '@aomao/plugin-alignment';
import Content from './content';
import OTClient from './ot-client';

Engine.card.add('hr', HrEntry);
Engine.card.add('checkbox', Checkbox);
Engine.plugin.add('indent', Indent);
Engine.plugin.add('redo', Redo);
Engine.plugin.add('undo', Undo);
Engine.plugin.add('bold', Bold);
Engine.plugin.add('italic', Italic);
Engine.plugin.add('underline', Underline);
Engine.plugin.add('hr', Hr);
Engine.plugin.add('tasklist', Tasklist);
Engine.plugin.add('orderedlist', Orderedlist);
Engine.plugin.add('unorderedlist', Unorderedlist);
Engine.plugin.add('heading', Heading);
Engine.plugin.add('strikethrough', Strikethrough);
Engine.plugin.add('sub', Sub);
Engine.plugin.add('sup', Sup);
Engine.plugin.add('alignment', Alignment);

const EngineDemo = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const engineRef = useRef<EngineInterface>();
	const [content, setContent] = useState<string>(
		`<p data-id="daab65504017af77a36594f98ab4875d">Hello<strong>AoMao</strong></p><card type="block" name="hr" value="data:%7B%22id%22%3A%22eIxTM%22%7D"></card>`,
	);

	useEffect(() => {
		if (!ref.current) return;
		//实例化引擎
		const engine = new Engine(ref.current);
		//初始化本地协作，用作记录历史
		engine.ot.initLockMode();
		//设置编辑器值
		engine.setValue(content);
		//监听编辑器值改变事件
		engine.on('change', value => {
			setContent(value);
			console.log(`value:${value}，html:${engine.getHtml()}`);
		});
		engineRef.current = engine;
		//实例化协作编辑客户端
		const otClient = new OTClient(engine);
		//连接到协作服务端，demo文档
		otClient.connect('ws://127.0.0.1:8080', 'demo');
	}, []);

	return (
		<div>
			<div style={{ position: 'relative' }}>
				<div ref={ref} />
			</div>
			<h4>ContentView:</h4>
			<Content content={content} />
		</div>
	);
};

export default EngineDemo;