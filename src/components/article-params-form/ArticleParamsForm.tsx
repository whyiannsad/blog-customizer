import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, useEffect } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../../components/radio-group';
import { Separator } from '../../components/separator';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setBasicArticleState: (items: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setBasicArticleState,
}: ArticleParamsFormProps) => {
	const baseRef = useRef<HTMLFormElement>(null);
	const [isOpen, setOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleButtonForm = () => {
		setOpen(!isOpen);
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (e: MouseEvent) => {
			if (baseRef.current && !baseRef.current.contains(e.target as Node)) {
				toggleButtonForm();
			}
		};

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				toggleButtonForm();
			}
		};

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen, toggleButtonForm, baseRef]);

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setBasicArticleState(formState);
	};

	const formReset = () => {
		setBasicArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggleButtonForm} isOpened={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} ref={baseRef} onSubmit={formSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
						title='Ширина контента'
					/>
					<div className={clsx(styles.bottomContainer)}>
						<Button title='Сбросить' type='reset' onClick={formReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
