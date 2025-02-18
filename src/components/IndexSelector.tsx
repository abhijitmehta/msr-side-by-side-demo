import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Settings } from 'lucide-react';

interface IndexSelectorProps {
  selectedIndices: string[];
  onSelectIndex: (indices: string[]) => void;
  availableIndices: string[];
}

export function IndexSelector({
  selectedIndices,
  onSelectIndex,
  availableIndices,
}: IndexSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-20 z-50 rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600 transition-colors duration-200"
        aria-label="Configure Indices"
      >
        <Settings className="h-6 w-6" />
      </button>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Select Indices to Compare
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Select up to three indices to compare search results
                    </p>
                    <div className="mt-4 space-y-3">
                      {availableIndices.map((index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            checked={selectedIndices.includes(index)}
                            onChange={(e) => {
                              const newSelection = e.target.checked
                                ? [...selectedIndices, index]
                                : selectedIndices.filter((i) => i !== index);
                              if (newSelection.length <= 3) {
                                onSelectIndex(newSelection);
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">{index}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}