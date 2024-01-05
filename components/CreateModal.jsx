import { FaPlus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Form from "./Form";
import { useRouter } from "next/router";

const CreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlistCreated, setPlaylistCreated] = useState({
    status: false,
    message: "",
  });

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  // refresh server side props - to show update
  const router = useRouter();
  const refreshData = () => {
    closeModal();
    router.replace(router.asPath);
    setPlaylistCreated({ status: false, message: '' });
  };

  return (
    <>
      <button
        type="button"
        aria-label="create"
        onClick={openModal}
        className="text-sm font-medium h-8 w-8"
      >
        <FaPlus className="text-primaryRed h-full w-full" />
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
            <div data-testid="backdrop" className="fixed inset-0 bg-black/60" />
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
                <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-primaryBgAlt p-6 text-left align-middle shadow-xl transition-all border ${playlistCreated.status ? 'border-emerald-600' : 'border-redHover'}`}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-300"
                  >
                    Create a Playlist
                  </Dialog.Title>
                  {!playlistCreated.status ? (
                    <Form
                      refreshData={refreshData}
                      setPlaylistCreated={setPlaylistCreated}
                    />
                  ) : (
                    <>
                      <Dialog.Description
                        data-testid="playlist-success"
                      className='text-emerald-400 py-6'>
                        {playlistCreated.message}
                      </Dialog.Description>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-emerald-500 px-4 py-2 text-sm font-medium dark:text-white hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                        onClick={refreshData}
                      >
                        Close
                      </button>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateModal;
