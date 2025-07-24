import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const MoviesPagination = ({ currentPage, totalPages, onPageChange, ...props }) => {
  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationButton onClick={() => onPageChange(currentPage - 1)}>
              {currentPage - 1}
            </PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationButton isActive>{currentPage}</PaginationButton>
        </PaginationItem>

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationButton onClick={() => onPageChange(currentPage + 1)}>
              {currentPage + 1}
            </PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
