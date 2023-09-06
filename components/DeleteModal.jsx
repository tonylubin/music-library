import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LuXCircle } from 'react-icons/lu';

export default function DeleteModal({ playlistName, removePlaylist }) {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const handleDelete = async (name) => {
    await removePlaylist(name);
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="h-6 w-6 rounded-full bg-primaryBgAlt"
      >
        <LuXCircle className="w-full h-full text-primaryRed" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primaryBgAlt p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-300"
                  >
                    Delete Playlist
                  </Dialog.Title>
                  <Dialog.Description className="p-4 text-neutral-500 text-sm">
                    Do you want to remove the playlist{" "}
                    <span className="text-primaryRed px-1">
                      {playlistName}{" "}
                    </span>
                    from your library? To delete this playlist press confirm.
                  </Dialog.Description>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-redHover px-4 py-2 text-sm font-medium dark:text-white hover:bg-primaryRed focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryRed focus-visible:ring-offset-2 text-neutral-300"
                    onClick={() => handleDelete(playlistName)}
                  >
                    Confirm
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
