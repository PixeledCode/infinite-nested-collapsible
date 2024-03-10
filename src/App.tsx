import { Dispatch, SetStateAction, useState } from 'react'

import './App.css'

type Item = {
	label: string
	id: string
	children?: Item[]
}

const data: Item[] = [
	{
		label: 'Fruits',
		id: 'fruits',
		children: [
			{
				label: 'Apple',
				id: 'apple',
				children: [
					{
						label: 'Red Apple',
						id: 'red-apple',
					},
				],
			},
			{
				label: 'Mango',
				id: 'mango',
				children: [
					{
						label: 'Green Mango',
						id: 'green-mango',
					},
				],
			},
			{
				label: 'Strawberry',
				id: 'strawberry',
			},
		],
	},
	{
		label: 'Colors',
		id: 'colors',
		children: [
			{
				label: 'Grays',
				id: 'grays',
				children: [
					{
						label: 'Light Gray',
						id: 'light-gray',
						children: [
							{
								label: 'Light Gray 1',
								id: 'light-gray-1',
							},
							{
								label: 'Light Gray 2',
								id: 'light-gray-2',
							},
						],
					},
					{
						label: 'Dark Gray',
						id: 'dark-gray',
					},
				],
			},
			{
				label: 'Red',
				id: 'red',
			},
		],
	},
	{
		label: 'Biryani',
		id: 'biryani',
	},
]

function filterItems(items: Item[], searchInput: string): Item[] {
	const lowerSearchInput = searchInput.toLowerCase()
	return structuredClone(items).filter((item) => {
		if (item.label.toLowerCase().includes(lowerSearchInput)) {
			return true
		}

		if (item.children) {
			item.children = filterItems(item.children, searchInput)
			return item.children.length > 0
		}

		return false
	})
}

function App() {
	const [expanded, setExpanded] = useState<string>('')
	const [search, setSearch] = useState<string>('')
	const [list, setList] = useState<Item[]>(data)

	return (
		<main>
			<input
				type="text"
				onChange={(e) => {
					setSearch(e.target.value)
					setList(filterItems(data, e.target.value))
				}}
				value={search}
			/>
			<ul className="list-wrapper">
				{list.length > 0 ? (
					list.map((item) => {
						return item.children ? (
							<ExpandableItem
								key={item.id}
								data={item}
								setExpanded={setExpanded}
								expanded={expanded}
							/>
						) : (
							<Item data={item} key={item.id} />
						)
					})
				) : (
					<>No Result</>
				)}
			</ul>
		</main>
	)
}

const Item = ({ data }: { data: Item }) => {
	return (
		<li key={data.id} className="list-item">
			<span>{data.label}</span>
		</li>
	)
}

const ExpandableItem = ({
	data,
	expanded,
	setExpanded,
}: {
	data: Item
	expanded: string
	setExpanded: Dispatch<SetStateAction<string>>
}) => {
	const [childExpanded, setChildExpanded] = useState<string>('')

	return (
		<li key={data.id} className="expandable-trigger">
			<button
				aria-expanded={expanded === data.id}
				onClick={() => {
					setExpanded((id) => (id === data.id ? '' : data.id))
				}}
			>
				<span>{data.label}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					width={16}
				>
					<path
						fill="white"
						d="M31.3 192l121.5 121.5c4.7 4.7 12.3 4.7 17 0L291.3 192c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L160 239.8 68.3 152c-4.7-4.7-12.3-4.7-17 0L28.7 174.6c-4.7 4.7-4.7 12.3 0 17z"
					/>
				</svg>
			</button>

			{expanded === data.id && (
				<div className="expanded-container">
					{
						<ul className="child-container">
							{data.children?.map((child) => {
								return child.children ? (
									<ExpandableItem
										key={child.id}
										data={child}
										setExpanded={setChildExpanded}
										expanded={childExpanded}
									/>
								) : (
									<Item data={child} key={child.id} />
								)
							})}
						</ul>
					}
				</div>
			)}
		</li>
	)
}

export default App
