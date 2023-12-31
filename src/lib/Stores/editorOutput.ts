/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSONContent } from '@tiptap/core';
import { writable, type Writable } from 'svelte/store';

export const editorJson: Writable<JSONContent> = writable();

export const currentRuang: Writable<string> = writable('Ruang');

export const currentPost: Writable<any> = writable();

export const userID: Writable<string> = writable('');

export const userName: Writable<string> = writable('');
