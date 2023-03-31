import { ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/legacy/image";
import Head from "next/head";
import { urlFor } from "../sanity";
import numeral from "numeral";
import { removeFromBasket } from "../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface Props {
  items: Product[];
  id: string;
}

function CheckoutProduct({ id, items }: Props) {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center",
    });
  };

  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  const formattedPrice = numeral(totalPrice).format("$0,0.00");

  return (
    <div>
    <Head>
        <title>Bag - Apple</title>
        <link rel="icon" href="/cart.png" />
      </Head>
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(items[0].image[0]).url()}
          layout="fill"
          objectFit="contain"
          alt="gro"
        />
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <ChevronDownIcon className="h-6 w-6 text-blue-500" />
            </p>
          </div>

          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details
            <ChevronDownIcon className="h-6 w-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">{formattedPrice}</h4>
          <button
            onClick={removeItemFromBasket}
            className="text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CheckoutProduct;
