import { EditorContent, Toolbar, useEditor } from '@youknown/react-editor/src'
import { Button } from '@youknown/react-ui/src'

export default () => {
	const editor = useEditor({
		content: `<h2>
		Hi there,
	  </h2>
	  <p>
		this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
	  </p>
	  <ul>
		<li>
		  That’s a bullet list with one …
		</li>
		<li>
		  … or two list items.
		</li>
	  </ul>
	  <p>
		Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
	  </p>
	  <pre><code class="language-css">body {
  display: none;
}</code></pre>
	  <p>
		I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
	  </p>
	  <blockquote>
		Wow, that’s amazing. Good work, boy! 👏
		<br />
		— Mom
	  </blockquote>
	  <table>
		  <tbody>
			<tr>
			  <th>Name</th>
			  <th colspan="3">Description</th>
			</tr>
			<tr>
			  <td>Cyndi Lauper</td>
			  <td>singer</td>
			  <td>songwriter</td>
			  <td>actress</td>
			</tr>
		  </tbody>
		</table>
		</h2>
	  <p>
		this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
	  </p>
	  <ul>
		<li>
		  That’s a bullet list with one …
		</li>
		<li>
		  … or two list items.
		</li>
	  </ul>
	  <p>
		Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
	  </p>
	  <pre><code class="language-css">body {
  display: none;
}</code></pre>
	  <p>
		I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
	  </p>
	  <blockquote>
		Wow, that’s amazing. Good work, boy! 👏
		<br />
		— Mom
	  </blockquote>
	  <table>
		  <tbody>
			<tr>
			  <th>Name</th>
			  <th colspan="3">Description</th>
			</tr>
			<tr>
			  <td>Cyndi Lauper</td>
			  <td>singer</td>
			  <td>songwriter</td>
			  <td>actress</td>
			</tr>
		  </tbody>
		</table>
	`
	})

	if (!editor) return null

	return (
		<div>
			<div className="h-64px flex justify-between items-center p-[0_32px] top-0 bg-bg-0 z-10">
				<h1>文档</h1>
				<Button disabled={editor.isEmpty} primary>
					保存
				</Button>
			</div>
			<div className="flex flex-col items-center">
				<div className="sticky top-0 bg-bg-0 z-30 flex justify-center w-100% pt-8px pb-8px b-b-solid b-b-1px b-bd-line">
					<div className="p-4px bg-bg-2 b-solid b-1px b-bd-line rd-8px">
						<Toolbar editor={editor} />
					</div>
				</div>
				<div className="m-[0_auto] w-750px pt-48px">
					<EditorContent editor={editor} />
				</div>
			</div>
		</div>
	)
}
