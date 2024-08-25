import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { MODULE_KEYS } from "../../core/enums/module-keys.enum";
import { MessageModel, MessageView } from "../../components/shared/messages/messages.enum";
import { MESSAGING_ACTIONS } from "../actions/messages.actions";

export interface MessageState extends EntityState<MessageModel>{}

export const messagesKey = MODULE_KEYS.massages;
export const messagesAdapter: EntityAdapter<MessageModel> = createEntityAdapter<MessageModel>();
export const initialMessageState: MessageState = messagesAdapter.getInitialState();


export const messagesReducer = createReducer(
  initialMessageState,
  on(MESSAGING_ACTIONS.addMassage, (state = initialMessageState, { message }) => {
    return messagesAdapter.addOne({...message, id: message.id || generatedId()},  state);
  }),
  on(MESSAGING_ACTIONS.removeMassage, (state, { id }) => {
    return messagesAdapter.removeOne(id,  state);
  })
);
const {
  selectTotal
} = messagesAdapter.getSelectors();

export const selectMessageState = createFeatureSelector<MessageState>(messagesKey);
export const selectFilteredMessagesByType = (messageView: MessageView) => createSelector(
  selectMessageState,
  (state: MessageState) => {
    const allMessages = Object.values(state.entities);
    return allMessages.filter(message => message?.view === messageView).map(msg => (
       {
        severity: msg?.severity?.toLowerCase(),
        summary: msg?.message.name,
        detail: msg?.message.message,
        id: msg?.id,
      }
    ));
  }
);
export const selectMessageTotal = selectTotal;

export const generatedId = (): number => {
  return new Date().getTime()
}
