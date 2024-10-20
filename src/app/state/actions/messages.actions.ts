import { createActionGroup, props } from "@ngrx/store";
import { MessageModel } from "../../components/molecules/messages/messages.enum";

export const MESSAGING_ACTIONS = createActionGroup({
  source: 'MESSAGING',
  events: {
    registerMessage: props<{ message: MessageModel }>(),
    addMassage: props<{ message: MessageModel }>(),
    setActive: props<{ id: number }>(),
    removeMassage: props<{ id: number }>(),
    upsertMassage: props<{ id: number }>(),
  },
});
